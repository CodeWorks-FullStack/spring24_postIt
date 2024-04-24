import { Schema } from "mongoose";



export const AlbumSchema = new Schema({
  title: { type: String, required: true, minLength: 3, maxLength: 25 },
  description: { type: String, required: true, minLength: 15, maxLength: 250, default: "a couple people walking down a street at night" },
  category: { type: String, required: true, enum: ['animals', 'food', 'aesthetics', 'misc', 'games'], default: 'misc' },
  coverImg: { type: String, required: true, maxLength: 1000, default: 'https://images.unsplash.com/photo-1713714614660-18a216d92281?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8' },
  archived: { type: Boolean, required: true, default: false },
  creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

AlbumSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

// NOTE this works a lot like other virtuals but now it's fields are flipped, since it's looking for data matches in a child collection, instead of the reverse, like the creator virtual
AlbumSchema.virtual('memberCount', {
  localField: '_id',
  ref: 'Collaborator',
  foreignField: 'albumId',
  justOne: false,
  count: true
})
