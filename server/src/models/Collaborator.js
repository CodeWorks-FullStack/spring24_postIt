import { Schema } from "mongoose";



export const CollaboratorSchema = new Schema({
  albumId: { type: Schema.ObjectId, required: true, ref: 'Album' },
  accountId: { type: Schema.ObjectId, required: true, ref: 'Account' }
}, { toJSON: { virtuals: true } })


CollaboratorSchema.virtual('album', {
  localField: 'albumId',
  ref: 'Album',
  foreignField: '_id',
  justOne: true
})

CollaboratorSchema.virtual('profile', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true,
})
