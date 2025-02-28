import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.pm.aora',
  projectId: '67a864bf001c7389a301',
  databaseId: '67a8673d002d6dd2b3d4',
  userCollectionId: '67a8678500223fffeb9d',
  videoCollectionId: '67a8679c00036ca5bd40',
  storageId: '67a86ca4003de130276d',
}

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your API Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform)
  ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (username, email, password) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error('Account not created');

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        email,
        avatar: avatarUrl
      }
    );
    return newUser;

  } catch (error) {
    console.log("create user error: ", error);
    throw error;
  }
}

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Error signing in or checking session:", error);
    throw error; // Re-throw the error for handling elsewhere
  }
}

export const signOut = async () => {
  try {
    await account.deleteSession('current'); // Delete the current session
    console.log("User signed out.");
    // Redirect to login screen or perform other logout actions.
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (currentAccount?.$id) { // Optional chaining for currentAccount and $id
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [
          Query.equal('accountId', currentAccount.$id),
        ]
      );

      // Optional chaining for currentUser, documents, and length
      if (currentUser?.documents?.length > 0) {
        return currentUser.documents[0];
      } else {
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error;
  }
};