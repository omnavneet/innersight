const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    email: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    clerkId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const journalEntrySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    userId: {
      type: String,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Draft', 'Published', 'Archived'],
      default: 'Draft',
    },
  },
  {
    timestamps: true,
  }
)

const analysisSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    entryId: {
      type: String,
      ref: 'JournalEntry',
      required: true,
    },
    userId: {
      type: String,
      ref: 'User',
      required: true,
    },
    mood: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    negative: {
      type: Boolean,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    sentimentScore: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

journalEntrySchema.virtual('analysis', {
  ref: 'Analysis',
  localField: '_id',
  foreignField: 'entryId',
  justOne: true,
})

journalEntrySchema.index({ userId: 1, _id: 1 }, { unique: true })
analysisSchema.index({ entryId: 1 }, { unique: true })
analysisSchema.index({ userId: 1 })

const UserModel = mongoose.models.User || mongoose.model('User', userSchema)
const JournalEntryModel =
  mongoose.models.JournalEntry ||
  mongoose.model('JournalEntry', journalEntrySchema)
const AnalysisModel =
  mongoose.models.Analysis || mongoose.model('Analysis', analysisSchema)

module.exports = {
  UserModel,
  JournalEntryModel,
  AnalysisModel,
}
