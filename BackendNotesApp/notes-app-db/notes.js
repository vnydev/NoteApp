var mongoose =  require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Notes = new Schema({
    CreatedBy: String,
    CreateOn: { type: Date, default: Date.now },
    Note: String,
    Favorite: Boolean
});

const Note = mongoose.model('Notes', Notes);

module.exports.CreateNote = (note, cb)=>{
    let createNote = new Note(note);
    createNote.save(cb);
}

module.exports.UpdateNote = (note, cb)=>{
    Note.findByIdAndUpdate({_id:note.Id},{$set:{
        'CreatedBy':note.CreatedBy,
        'CreateOn':note.CreateOn,
        'Note':note.Note,
        'Favorite':note.Favorite
    }},{new: true}, cb);

}

module.exports.GetAllNotes = (cb)=>{
    Note.find({}).sort({CreateOn:-1}).exec(cb);
}

module.exports.RemoveNote = (note_id, cb)=>{
    Note.findByIdAndDelete({_id:note_id}, cb);
}

module.exports.FavoriteNote = (note_id, favorite, cb)=>{
    Note.findByIdAndUpdate({_id:note_id},{$set:{'Favorite':favorite}},{new: true}, cb);
}