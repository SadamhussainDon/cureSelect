import Realm from 'realm';

const DogSchema = {
  name: 'Dog',
  properties: {
    _id: 'objectId',
    name: 'string',
    age: 'int',
    breed: 'string?',
  },
  primaryKey: '_id',
};

export async function RealmEx() {
  const app = new Realm.App({id: 'application-0-xubnk'});
  console.log(app);

  // MongoDB Realm offers built-in Auth to secure Syncing data
  const credentials = Realm.Credentials.anonymous();
  try {
    const user = await app.logIn(credentials);
    console.log(user);
  } catch (err) {
    console.error('Failed to log in', err);
  }

  // Data can be Synced with a simple configuration
  const config = {
    schema: [DogSchema],
    sync: {
      user: app.currentUser,
      partitionValue: 'MyPartitionValue',
    },
  };

  const realm = await Realm.open(config);

  // Create a new dog
  await createDog(realm, 'Rufus', 3, 'Labrador');

  // Read all dogs
  const allDogs = readAllDogs(realm);
  console.log(allDogs);

  // Create a new Dog object
  async function createDog(realm, name, age, breed) {
    await realm.write(() => {
      realm.create('Dog', {
        _id: new Realm.BSON.ObjectId(),
        name: name,
        age: age,
        breed: breed,
      });
    });
  }

  // Read all Dog objects
  function readAllDogs(realm) {
    const allDogs = realm.objects('Dog');
    return allDogs;
  }

  // Update a Dog object
  async function updateDog(realm, dogId, name, age, breed) {
    const dog = realm.objectForPrimaryKey('Dog', dogId);
    await realm.write(() => {
      dog.name = name;
      dog.age = age;
      dog.breed = breed;
    });
  }

  // Delete a Dog object
  async function deleteDog(realm, dogId) {
    const dog = realm.objectForPrimaryKey('Dog', dogId);
    await realm.write(() => {
      realm.delete(dog);
    });
  }
}
