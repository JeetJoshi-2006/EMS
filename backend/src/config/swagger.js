const swaggerJsdoc = require('swagger-jsdoc');
const config = require('../config');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Employee Management System API',
      version: '1.0.0',
      description: 'REST API for Employee Management System - Employee lifecycle, attendance, leave, payroll, and more',
      contact: { name: 'EMS Support', email: 'support@ems.com' },
    },
    servers: [
  {
    url: '/',
    description: 'Current Server',
  },
],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            errors: { type: 'array', items: { type: 'string' } },
          },
        },
        Pagination: {
          type: 'object',
          properties: {
            total: { type: 'integer' },
            page: { type: 'integer' },
            limit: { type: 'integer' },
            totalPages: { type: 'integer' },
            hasNext: { type: 'boolean' },
            hasPrev: { type: 'boolean' },
          },
        },
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string', enum: ['admin', 'hr', 'manager', 'employee'] },
            isActive: { type: 'boolean' },
          },
        },
        Employee: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            employeeId: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            status: { type: 'string' },
            department: { type: 'object' },
            designation: { type: 'object' },
          },
        },
        Leave: {
          type: 'object',
          properties: {
            leaveType: { type: 'string' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            reason: { type: 'string' },
            status: { type: 'string' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: 'Auth', description: 'Authentication' },
      { name: 'Employees', description: 'Employee management' },
      { name: 'Departments', description: 'Department management' },
      { name: 'Attendance', description: 'Attendance & shifts' },
      { name: 'Leaves', description: 'Leave management' },
      { name: 'Payroll', description: 'Payroll processing' },
      { name: 'Dashboard', description: 'Analytics' },
    ],
  },
  apis: ['./src/routes/*.js', './src/docs/*.yaml'],
};

module.exports = swaggerJsdoc(options);
