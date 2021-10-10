class BasicOperations {
    constructor(model) {
      this.model = model;
    }
  
    findById(id) {
      return this.model
        .findById(id)
        .then((result) => {
          console.log(
            `\n>> Found Document ${this.model.prototype.constructor.modelName}:\n`,
            result
          );
          return result;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    find(filter={}) {
      return this.model
        .find(filter,{ '_id': 0,'__v': 0})
        .then((result) => {
          console.log(
            `\n>> Found Documents ${this.model.prototype.constructor.modelName}:\n`,
            result
          );
          return result;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    
    create(document) {
      return this.model
        .create(document)
        .then((result) => {
          console.log(
            `\n>> Created ${this.model.prototype.constructor.modelName}:\n`,
            result
          );
          return result;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    findByIdAndUpdate(id, updateData) {
      return this.model
        .findByIdAndUpdate(id, { $set: updateData }, { new: true })
        .then((result) => {
          const message = `Updated  Document (_id: ${result._id}) in ${this.model.prototype.constructor.modelName}`;
          console.log(`\n>> ${message}:\n`, result);
          return { result, message };
        })
        .catch((err) => {
          console.log(err);
        });
    }

    findOneAndIncrement(filter, updateData) {
      console.log(updateData,filter)
      return this.model
        .findOneAndUpdate(filter, {$inc:updateData}, {
          returnOriginal: false
        })
        .then((result) => {
          const message = `Updated  Document (_id: ${result._id}) in ${this.model.prototype.constructor.modelName}`;
          console.log(`\n>> ${message}:\n`, result);
          return { result, message };
        })
        .catch((err) => {
          console.log(err);
        });
    }
  

    findOneAndUpdate(filter, updateData) {
      console.log(updateData,filter)
      return this.model
        // .findOneAndUpdate(filter, {$inc:updateData}, {
          .findOneAndUpdate(filter, updateData, {
          returnOriginal: false
        })
        .then((result) => {
          const message = `Updated  Document (_id: ${result._id}) in ${this.model.prototype.constructor.modelName}`;
          console.log(`\n>> ${message}:\n`, result);
          return { result, message };
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // addWithId (id,key,document) {
    //     const pushObject={}
    //     pushObject[key]=document._id
    //     return this.model.findByIdAndUpdate(id,
    //       { $push: pushObject },
    //       { new: true, useFindAndModify: false }
    //     ).then(result=>{
    //         console.log(`\n>> Added ${document._id} to ${key} in ${this.model.prototype.constructor.modelName}:\n`, result);
    //           return result;
    //     });
    //   };
  
    //   removeAddedWithId (id,key,idToBeRemoved) {
    //     const pullObject={}
    //     pullObject[key]=idToBeRemoved
    //     return this.model.findByIdAndUpdate(id,
    //       { $pull: pullObject },
    //       { new: true, useFindAndModify: false }
    //     ).then(result=>{
    //         console.log(`\n>> Removed ${idToBeRemoved} from  ${key} in ${this.model.prototype.constructor.modelName}:\n`, result);
    //           return result;
    //     });
    //   };
  }
  
  module.exports = BasicOperations;
  