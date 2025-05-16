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
    // console.error("Error signing in or checking session:", error);
    throw error; // Re-throw the error for handling elsewhere
  }
}


export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

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
      console.warn(`Appwrite user document not found for accountId: ${currentAccount.$id}. An account exists but no profile document.`);
      return null;
    }
  } catch (error) {
    console.log("getCurrentUser: No user session found or error fetching user details.", error.message);
    return null;
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [
        Query.limit(7),
        Query.orderDesc('$createdAt'),
      ]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search('title', query)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal('creator', userId)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (error) {
    throw new Error(error);
  }
}