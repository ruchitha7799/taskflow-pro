const { z } = require("zod");

const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  status: z.enum(["PENDING", "COMPLETED"]).optional()
});

module.exports = {
  createTaskSchema
};