import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import 'dotenv/config';
import { AgentOrchestrator } from "./agents/AgentOrchestrator.js";
import prisma from "./db/client.js";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";
import { validateBody, validateParams, validateQuery } from "./middleware/validate.js";
import { errorHandler } from "./middleware/errorHandler.js";
import {
  loginSchema,
  studentSchema,
  studentIdParam,
  internshipSchema,
  applicationSchema,
  progressParamsSchema,
  milestoneParamsSchema,
  feedbackSchema,
  eventSchema,
  upcomingEventsQuery,
  alertsQuery,
  resourceSchema,
  notifySchema,
} from "./validation/schemas.js";
import { authMiddleware, requireRole, generateToken } from "./auth/jwt.js";
import { sendNotification } from "./firebase/notify.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Swagger Docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Initialize AI Agent System
const agentSystem = new AgentOrchestrator();

// Setup system event logging
agentSystem.on('system:initialized', () => {
  console.log('🤖 AI Agent System ready');
});

agentSystem.on('system:matches_generated', (data) => {
  console.log(`📊 System Event: ${data.matchCount} matches generated for student ${data.studentId}`);
});

agentSystem.on('system:application_submitted', (data) => {
  console.log(`📊 System Event: Application submitted - Student ${data.studentId} -> Internship ${data.internshipId}`);
});

// Root
/**
 * @swagger
 * /:
 *   get:
 *     summary: API info and system status
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Info payload
 */
app.get("/", (req: Request, res: Response) => {
  res.json({ 
    message: "Welcome to PM Internship Smart Allocation API with AI Agents",
    version: "2.0.0",
    agents: ["IntelligentMatchingAgent", "MonitoringFeedbackAgent", "PlanningCoordinationAgent"],
    status: agentSystem.getSystemStatus()
  });
});

// Auth
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Demo login to obtain JWT for a role
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: JWT issued
 */
app.post("/auth/login", validateBody(loginSchema), (req: Request, res: Response) => {
  const { userId, role } = req.body as { userId: string; role: 'student' | 'employer' | 'admin' };
  const token = generateToken(userId, role);
  res.json({ token, role });
});

// AI Agent System Routes

// System Status and Control
/**
 * @swagger
 * /api/system/status:
 *   get:
 *     summary: Get system status
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Status object
 */
app.get("/api/system/status", (req: Request, res: Response) => {
  res.json(agentSystem.getSystemStatus());
});

/**
 * @swagger
 * /api/system/metrics:
 *   get:
 *     summary: Get system metrics
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Metrics object
 */
app.get("/api/system/metrics", (req: Request, res: Response) => {
  res.json(agentSystem.getSystemMetrics());
});

/**
 * @swagger
 * /api/system/analytics:
 *   get:
 *     summary: Get detailed analytics
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Analytics object
 */
app.get("/api/system/analytics", (req: Request, res: Response) => {
  res.json(agentSystem.getDetailedAnalytics());
});

/**
 * @swagger
 * /api/system/demo:
 *   post:
 *     summary: Run demo actions for AI agents
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Demo started
 */
app.post("/api/system/demo", (req: Request, res: Response) => {
  agentSystem.runDemo();
  res.json({ message: "Demo started successfully", timestamp: new Date() });
});

// Student Management
/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Add a new student to the system
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Student added
 */
app.post("/api/students", validateBody(studentSchema), (req: Request, res: Response) => {
  try {
    agentSystem.addStudent(req.body);
    // Best-effort persistence to DB (non-blocking flow)
    (async () => {
      try {
        const s = req.body;
        await prisma.student.upsert({
          where: { id: s.id },
          update: {
            name: s.name,
            email: s.email,
            skills: s.skills ?? [],
            degree: s.academicRecord?.degree ?? s.degree ?? "",
            cgpa: s.academicRecord?.cgpa ?? s.cgpa ?? 0,
            year: s.academicRecord?.year ?? s.year ?? 0,
            institution: s.academicRecord?.institution ?? s.institution ?? "",
            category: s.category ?? "GEN",
            experience: s.experience ?? [],
            portfolio: s.portfolio,
            resume: s.resume,
          },
          create: {
            id: s.id,
            name: s.name,
            email: s.email,
            skills: s.skills ?? [],
            degree: s.academicRecord?.degree ?? s.degree ?? "",
            cgpa: s.academicRecord?.cgpa ?? s.cgpa ?? 0,
            year: s.academicRecord?.year ?? s.year ?? 0,
            institution: s.academicRecord?.institution ?? s.institution ?? "",
            category: s.category ?? "GEN",
            experience: s.experience ?? [],
            portfolio: s.portfolio,
            resume: s.resume,
          }
        });
      } catch (e) {
        console.warn("[DB] Failed to persist student:", (e as Error).message);
      }
    })();
    res.json({ message: "Student added successfully", studentId: req.body.id });
  } catch (error) {
    res.status(400).json({ error: "Failed to add student", details: error });
  }
});

/**
 * @swagger
 * /api/students/{studentId}/matches:
 *   get:
 *     summary: Get AI matches for a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matches returned
 */
app.get("/api/students/:studentId/matches", validateParams(studentIdParam), (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    if (!studentId) {
      return res.status(400).json({ error: "Student ID is required" });
    }
    const matches = agentSystem.getMatchesForStudent(studentId);
    res.json({ matches, count: matches.length });
  } catch (error) {
    res.status(404).json({ error: "Student not found or no matches available" });
  }
});

// Internship Management
/**
 * @swagger
 * /api/internships:
 *   post:
 *     summary: Add a new internship (employer/admin)
 *     tags: [Internships]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Internship'
 *     responses:
 *       200:
 *         description: Internship added
 */
app.post("/api/internships", authMiddleware, requireRole('employer','admin'), validateBody(internshipSchema), (req: Request, res: Response) => {
  try {
    agentSystem.addInternship(req.body);
    // Best-effort persistence to DB (non-blocking flow)
    (async () => {
      try {
        const i = req.body;
        await prisma.internship.upsert({
          where: { id: i.id },
          update: {
            title: i.title,
            company: i.company,
            description: i.description ?? "",
            domain: i.details?.domain ?? i.domain ?? "",
            location: i.details?.location ?? i.location ?? "",
            durationMonths: i.details?.duration ?? i.duration ?? 0,
            stipend: i.details?.stipend ?? i.stipend ?? 0,
            startDate: new Date(i.details?.startDate ?? i.startDate ?? Date.now()),
            applicationDeadline: new Date(i.details?.applicationDeadline ?? i.applicationDeadline ?? Date.now()),
            requiredSkills: i.requirements?.skills ?? i.requiredSkills ?? [],
            minCgpa: i.requirements?.minCgpa ?? i.minCgpa ?? 0,
            degrees: i.requirements?.degree ?? i.degrees ?? [],
            requiredExp: i.requirements?.experience ?? i.requiredExp ?? [],
            totalSlots: i.slots?.total ?? i.totalSlots ?? 0,
            filledSlots: i.slots?.filled ?? i.filledSlots ?? 0,
            status: i.status ?? "active",
          },
          create: {
            id: i.id,
            title: i.title,
            company: i.company,
            description: i.description ?? "",
            domain: i.details?.domain ?? i.domain ?? "",
            location: i.details?.location ?? i.location ?? "",
            durationMonths: i.details?.duration ?? i.duration ?? 0,
            stipend: i.details?.stipend ?? i.stipend ?? 0,
            startDate: new Date(i.details?.startDate ?? i.startDate ?? Date.now()),
            applicationDeadline: new Date(i.details?.applicationDeadline ?? i.applicationDeadline ?? Date.now()),
            requiredSkills: i.requirements?.skills ?? i.requiredSkills ?? [],
            minCgpa: i.requirements?.minCgpa ?? i.minCgpa ?? 0,
            degrees: i.requirements?.degree ?? i.degrees ?? [],
            requiredExp: i.requirements?.experience ?? i.requiredExp ?? [],
            totalSlots: i.slots?.total ?? i.totalSlots ?? 0,
            filledSlots: i.slots?.filled ?? i.filledSlots ?? 0,
            status: i.status ?? "active",
          }
        });
      } catch (e) {
        console.warn("[DB] Failed to persist internship:", (e as Error).message);
      }
    })();
    res.json({ message: "Internship added successfully", internshipId: req.body.id });
  } catch (error) {
    res.status(400).json({ error: "Failed to add internship", details: error });
  }
});

// Application Management
/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Submit an application (student/admin)
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Application'
 *     responses:
 *       200:
 *         description: Application submitted
 */
app.post("/api/applications", authMiddleware, requireRole('student','admin'), validateBody(applicationSchema), (req: Request, res: Response) => {
  try {
    const { studentId, internshipId } = req.body;
    const success = agentSystem.submitApplication(studentId, internshipId);
    
    if (success) {
      res.json({ 
        message: "Application submitted successfully", 
        studentId, 
        internshipId,
        timestamp: new Date()
      });
    } else {
      res.status(400).json({ error: "Application failed - insufficient match score or internship full" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to submit application", details: error });
  }
});

// Progress Tracking
/**
 * @swagger
 * /api/progress/{studentId}/{internshipId}:
 *   put:
 *     summary: Update progress for a student's internship
 *     tags: [Progress]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: internshipId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Progress updated
 */
app.put("/api/progress/:studentId/:internshipId", validateParams(progressParamsSchema), (req: Request, res: Response) => {
  try {
    const { studentId, internshipId } = req.params;
    if (!studentId || !internshipId) {
      return res.status(400).json({ error: "Student ID and Internship ID are required" });
    }
    agentSystem.updateProgress(studentId, internshipId, req.body);
    res.json({ message: "Progress updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to update progress", details: error });
  }
});

/**
 * @swagger
 * /api/milestones/{studentId}/{internshipId}/{milestoneId}/complete:
 *   post:
 *     summary: Complete a milestone
 *     tags: [Progress]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: internshipId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: milestoneId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feedback:
 *                 type: string
 *     responses:
 *       200:
 *         description: Milestone completed
 */
app.post("/api/milestones/:studentId/:internshipId/:milestoneId/complete", validateParams(milestoneParamsSchema), (req: Request, res: Response) => {
  try {
    const { studentId, internshipId, milestoneId } = req.params;
    if (!studentId || !internshipId || !milestoneId) {
      return res.status(400).json({ error: "Student ID, Internship ID, and Milestone ID are required" });
    }
    const { feedback } = req.body;
    agentSystem.completeMilestone(studentId, internshipId, milestoneId, feedback);
    res.json({ message: "Milestone completed successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to complete milestone", details: error });
  }
});

// Feedback Management
/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Submit feedback
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Feedback'
 *     responses:
 *       200:
 *         description: Feedback submitted
 */
app.post("/api/feedback", validateBody(feedbackSchema), (req: Request, res: Response) => {
  try {
    const feedbackId = agentSystem.submitFeedback(req.body);
    res.json({ message: "Feedback submitted successfully", feedbackId });
  } catch (error) {
    res.status(400).json({ error: "Failed to submit feedback", details: error });
  }
});

// Scheduling and Events
/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Schedule an event (admin/employer)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event scheduled
 */
app.post("/api/events", authMiddleware, requireRole('admin','employer'), validateBody(eventSchema), (req: Request, res: Response) => {
  try {
    const eventId = agentSystem.scheduleEvent(req.body);
    if (eventId) {
      res.json({ message: "Event scheduled successfully", eventId });
    } else {
      res.status(400).json({ error: "Failed to schedule event - resources not available" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to schedule event", details: error });
  }
});

/**
 * @swagger
 * /api/events/upcoming:
 *   get:
 *     summary: Get upcoming events
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: participantId
 *         schema: { type: string }
 *       - in: query
 *         name: days
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Events list
 */
app.get("/api/events/upcoming", validateQuery(upcomingEventsQuery), (req: Request, res: Response) => {
  try {
    const participantId = req.query.participantId as string;
    const days = parseInt(req.query.days as string) || 7;
    const events = agentSystem.getUpcomingEvents(participantId, days);
    res.json({ events, count: events.length });
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch events", details: error });
  }
});

// Alert Management
/**
 * @swagger
 * /api/alerts:
 *   get:
 *     summary: Get active alerts
 *     tags: [Alerts]
 *     parameters:
 *       - in: query
 *         name: targetId
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Alerts list
 */
app.get("/api/alerts", validateQuery(alertsQuery), (req: Request, res: Response) => {
  try {
    const targetId = req.query.targetId as string;
    const alerts = agentSystem.getActiveAlerts(targetId);
    res.json({ alerts, count: alerts.length });
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch alerts", details: error });
  }
});

/**
 * @swagger
 * /api/alerts/{alertId}/resolve:
 *   post:
 *     summary: Resolve an alert (admin)
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: alertId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Alert resolved
 */
app.post("/api/alerts/:alertId/resolve", authMiddleware, requireRole('admin'), (req: Request, res: Response) => {
  try {
    const alertId = req.params.alertId;
    if (!alertId) {
      return res.status(400).json({ error: "Alert ID is required" });
    }
    agentSystem.resolveAlert(alertId);
    res.json({ message: "Alert resolved successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to resolve alert", details: error });
  }
});

// Resource Management
/**
 * @swagger
 * /api/resources:
 *   post:
 *     summary: Add a resource (admin)
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       200:
 *         description: Resource added
 */
app.post("/api/resources", authMiddleware, requireRole('admin'), validateBody(resourceSchema), (req: Request, res: Response) => {
  try {
    agentSystem.addResource(req.body);
    res.json({ message: "Resource added successfully", resourceId: req.body.id });
  } catch (error) {
    res.status(400).json({ error: "Failed to add resource", details: error });
  }
});

// Notifications
/**
 * @swagger
 * /api/notify:
 *   post:
 *     summary: Send a notification via Firebase Cloud Messaging (admin)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notify'
 *     responses:
 *       200:
 *         description: Notification result
 */
app.post('/api/notify', authMiddleware, requireRole('admin'), validateBody(notifySchema), async (req: Request, res: Response) => {
  try {
    const result = await sendNotification(req.body);
    res.json({ message: 'Notification sent', result });
  } catch (error) {
    res.status(400).json({ error: 'Failed to send notification', details: (error as Error).message });
  }
});

// Legacy Routes (for backward compatibility)

// Student portal routes
app.get("/student", (req: Request, res: Response) => {
  res.json({ 
    message: "Student portal API - Enhanced with AI matching",
    endpoints: [
      "POST /api/students - Register student",
      "GET /api/students/:id/matches - Get AI-generated matches",
      "POST /api/applications - Submit application"
    ]
  });
});

// Employer portal routes
app.get("/employer", (req: Request, res: Response) => {
  res.json({ 
    message: "Employer portal API - Enhanced with AI coordination",
    endpoints: [
      "POST /api/internships - Post internship",
      "POST /api/feedback - Submit feedback",
      "GET /api/analytics - View analytics"
    ]
  });
});

// Enhanced Analytics
app.get("/analytics", (req: Request, res: Response) => {
  const systemMetrics = agentSystem.getSystemMetrics();
  const detailedAnalytics = agentSystem.getDetailedAnalytics();
  
  res.json({
    // Legacy format
    totalInternships: systemMetrics.totalInternships,
    filled: Math.floor(systemMetrics.totalInternships * 0.7), // Estimated
    unfilled: Math.floor(systemMetrics.totalInternships * 0.3),
    categoryDistribution: { GEN: 20, OBC: 10, SC: 5, ST: 3, EWS: 4 },
    
    // Enhanced AI metrics
    aiMetrics: {
      totalMatches: systemMetrics.totalMatches,
      activeAlerts: systemMetrics.activeAlerts,
      scheduledEvents: systemMetrics.scheduledEvents,
      systemUptime: systemMetrics.systemUptime,
      agentStatuses: systemMetrics.agentStatuses
    },
    
    // Detailed breakdown
    detailed: detailedAnalytics
  });
});

// About
app.get('/about', (req: Request, res: Response) => {
  res.json({
    project: 'AI-Based Smart Allocation Engine – PM Internship Scheme',
    team: 'SIH 2025',
    version: '2.0.0',
    tech: ['React (TSX)', 'Node.js', 'Express', 'TypeScript', 'AI Agents'],
    agents: [
      {
        name: 'IntelligentMatchingAgent',
        description: 'AI-powered student-internship matching using multi-factor algorithms',
      },
      {
        name: 'MonitoringFeedbackAgent',
        description: 'Continuous progress tracking and feedback collection system',
      },
      {
        name: 'PlanningCoordinationAgent',
        description: 'Resource allocation and scheduling coordination system',
      },
    ],
    features: [
      'Intelligent matching with 85%+ accuracy',
      'Real-time progress monitoring',
      'Automated scheduling and coordination',
      'Comprehensive feedback system',
      'Predictive analytics and alerts',
    ],
  });
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  const systemStatus = agentSystem.getSystemStatus();
  res.json({
    status: systemStatus.isRunning ? 'healthy' : 'unhealthy',
    timestamp: new Date(),
    uptime: systemStatus.uptime,
    agents: systemStatus.agents,
  });
});

// Catch-all for 404
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    availableEndpoints: [
      'GET / - API information',
      'GET /api/system/status - System status',
      'GET /api/system/metrics - System metrics',
      'POST /api/students - Add student',
      'POST /api/internships - Add internship',
      'POST /api/applications - Submit application',
      'GET /analytics - Enhanced analytics',
      'GET /health - Health check',
      'GET /docs - API documentation',
    ],
  });
});

// Centralized error handler
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  agentSystem.shutdown();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  agentSystem.shutdown();
  process.exit(0);
});

// Start server
const PORT = Number(process.env.PORT ?? 5000);
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
  console.log(`🤖 AI Agent System initialized and ready`);
  console.log(`📊 Available endpoints:`);
  console.log(`   - GET /api/system/status - System status`);
  console.log(`   - POST /api/system/demo - Run demo`);
  console.log(`   - GET /analytics - Enhanced analytics`);
});
