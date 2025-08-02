const mongoose = require('mongoose');
const Note = require('./schemes/note');

class Database {
    constructor() {
        this.Url = "mongodb://127.0.0.1:27017/notaty";
    }
    
    async connect() {
        try {
            await mongoose.connect(this.Url);
            console.log("✅ Connected to MongoDB successfully");
        } catch (err) {
            console.error("❌ MongoDB connection error:", err.message);
            // إضافة اقتراحات استكشاف الأخطاء
            if (err.message.includes('ECONNREFUSED')) {
                console.log("⚠️  تأكد من أن خادم MongoDB يعمل (جرب 'mongod' في نافذة CMD منفصلة)");
            }
        }
    }

    addNote(note){
        return new Promise((resolve,reject)=>{
            
        note["createdDate"]=new Date();
        note["updatedDate"]=new Date();
        let newNote=new Note(note);
        newNote.save()
        .then(doc => {
           resolve(doc);
        }).catch(err => {
           reject(err);
        });
        })

    }
    getNotes(){
         return new Promise((resolve,reject)=>{
            Note.find({})
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                 reject(err);
            });
         }); 
    }

 
    getNoteById(id){
         return new Promise((resolve,reject)=>{
            Note.findById(id)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                 reject(err);
            });
         }); 
    }

    updateNote(note){
         return new Promise((resolve,reject)=>{
             note["updatedDate"]=new Date();
            Note.findByIdAndUpdate(note["_id"],note)
            .then(data => {
                console.log(data);
                resolve(data);
            })
            .catch(err => {
                 reject(err);
            });
         }); 
    }

    deleteNote(id){
         return new Promise((resolve,reject)=>{
            
            Note.findByIdAndDelete(id)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                 reject(err);
            });
         }); 
    }
      getNotesByTitle(noteTitle) {
    return new Promise((resolve, reject) => {
        const query = {title: {$regex: new RegExp(noteTitle, 'i')}};
        Note.find(query) // تم التعديل هنا - إزالة الأقواس الإضافية حول query
        .then(data => {
            resolve(data);
        })
        .catch(err => {
            reject(err);
        });
    }); 
}

}

module.exports = Database;