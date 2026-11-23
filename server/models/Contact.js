import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  organization: {
    type: String,
    trim: true,
    default: 'Individual / Confidential',
  },
  serviceInterest: {
    type: String,
    enum: [
      'Quantitative Crypto Intelligence',
      'Multi-Agent Financial AI (Earnings Desk)',
      'Regulatory Credit Underwriting (CreditPulse)',
      'Enterprise MERN & Python FinTech Development',
      'Bespoke Algorithmic Engineering',
      'Other / General Inquiry',
    ],
    default: 'Other / General Inquiry',
  },
  budget: {
    type: String,
    default: 'Flexible / To Be Discussed',
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'archived'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
