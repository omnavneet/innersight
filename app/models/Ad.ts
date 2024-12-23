import { Int32 } from 'mongodb'
import { Model, model, models, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export type User = {
  _id?: String
  createdAt?: Date
  updatedAt?: Date

  clerkId: String
  email: String
}

export type JournalEntry = {
  _id?: String
  createdAt?: Date
  updatedAt?: Date
  userId: String

  content: String
  status?: String
  analysis?: Analysis
}

export type Analysis = {
  _id: String
  createdAt?: Date
  updatedAt?: Date

  entryId: String
  userId: String
  mood: String
  summary: String
  color: String
  negative: String
  subject: String
  sentimentScore: number
}

const userSchema = new Schema<User>(
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

const journalEntrySchema = new Schema<JournalEntry>(
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

const AnalysisSchema = new Schema<Analysis>(
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
  ref: 'EntryAnalysis',
  localField: '_id',
  foreignField: 'entryId',
  justOne: true,
})

journalEntrySchema.index({ userId: 1, _id: 1 }, { unique: true })
AnalysisSchema.index({ entryId: 1 }, { unique: true })
AnalysisSchema.index({ userId: 1 })

export const UserModel: Model<User> =
  models.User || model<User>('User', userSchema)

export const JournalEntryModel: Model<JournalEntry> =
  models.JournalEntry || model<JournalEntry>('JournalEntry', journalEntrySchema)

export const AnalysisModel: Model<Analysis> =
  models.EntryAnalysis || model<Analysis>('EntryAnalysis', AnalysisSchema)
