import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

/**
 * Firestore service for handling database operations.
 */


export const getUserProfile = async (uid) => {
  const userRef = doc(db, "users", uid, "profile", "main");
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
};

// Transactions
export const addTransaction = async (uid, transactionData) => {
  console.log("Adding transaction for UID:", uid);
  console.log("Transaction Payload:", transactionData);
  
  try {
    const transactionsRef = collection(db, "users", uid, "transactions");
    const docRef = await addDoc(transactionsRef, {
      uid,
      ...transactionData,
      createdAt: new Date().toISOString()
    });
    console.log("Firestore Success: Transaction added with ID:", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Firestore Failure: Error adding transaction:", error);
    throw error;
  }
};

export const updateTransaction = async (uid, transactionId, transactionData) => {
  console.log("Updating transaction:", transactionId, "for UID:", uid);
  try {
    const transactionRef = doc(db, "users", uid, "transactions", transactionId);
    await updateDoc(transactionRef, transactionData);
    console.log("Firestore Success: Transaction updated");
  } catch (error) {
    console.error("Firestore Failure: Error updating transaction:", error);
    throw error;
  }
};

export const subscribeToTransactions = (uid, callback) => {
  console.log("Subscribing to transactions for UID:", uid);
  const transactionsRef = collection(db, "users", uid, "transactions");
  const q = query(
    transactionsRef, 
    orderBy("date", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const transactions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(`Firestore Success: Fetched ${transactions.length} transactions`);
    callback(transactions);
  }, (error) => {
    console.error("Firestore subscription error:", error);
  });
};

// Goals
export const addGoal = async (uid, goalData) => {
  console.log("Adding goal for UID:", uid);
  try {
    const goalsRef = collection(db, "users", uid, "goals");
    // Map frontend 'title' to 'goalTitle' and 'savedAmount' to 'alreadySaved' as requested
    const firestoreData = {
      goalTitle: goalData.title,
      purpose: goalData.purpose,
      targetAmount: goalData.targetAmount,
      alreadySaved: goalData.savedAmount,
      deadline: goalData.deadline,
      monthlyContribution: goalData.monthlyContribution,
      priority: goalData.priority,
      uid,
      createdAt: new Date().toISOString()
    };
    const docRef = await addDoc(goalsRef, firestoreData);
    console.log("Firestore Success: Goal added with ID:", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Firestore Failure: Error adding goal:", error);
    throw error;
  }
};

export const updateGoal = async (uid, goalId, goalData) => {
  try {
    const goalRef = doc(db, "users", uid, "goals", goalId);
    const firestoreData = {
      goalTitle: goalData.title,
      purpose: goalData.purpose,
      targetAmount: goalData.targetAmount,
      alreadySaved: goalData.savedAmount,
      deadline: goalData.deadline,
      monthlyContribution: goalData.monthlyContribution,
      priority: goalData.priority
    };
    await updateDoc(goalRef, firestoreData);
  } catch (error) {
    console.error("Firestore Failure: Error updating goal:", error);
    throw error;
  }
};

export const deleteGoal = async (uid, goalId) => {
  try {
    const goalRef = doc(db, "users", uid, "goals", goalId);
    const { deleteDoc } = await import("firebase/firestore");
    await deleteDoc(goalRef);
  } catch (error) {
    console.error("Firestore Failure: Error deleting goal:", error);
    throw error;
  }
};

export const subscribeToGoals = (uid, callback) => {
  const goalsRef = collection(db, "users", uid, "goals");
  const q = query(goalsRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const goals = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.goalTitle, // Map back to frontend expectation
        purpose: data.purpose,
        targetAmount: data.targetAmount,
        savedAmount: data.alreadySaved, // Map back to frontend expectation
        deadline: data.deadline,
        monthlyContribution: data.monthlyContribution,
        priority: data.priority,
        uid: data.uid,
        createdAt: data.createdAt
      };
    });
    callback(goals);
  });
};

// Recurring Expenses
export const addRecurringExpense = async (uid, expenseData) => {
  try {
    const expensesRef = collection(db, "users", uid, "recurringExpenses");
    const docRef = await addDoc(expensesRef, {
      ...expenseData,
      uid,
      createdAt: new Date().toISOString()
    });
    return docRef;
  } catch (error) {
    console.error("Firestore Failure: Error adding recurring expense:", error);
    throw error;
  }
};

export const updateRecurringExpense = async (uid, expenseId, expenseData) => {
  try {
    const expenseRef = doc(db, "users", uid, "recurringExpenses", expenseId);
    await updateDoc(expenseRef, expenseData);
  } catch (error) {
    console.error("Firestore Failure: Error updating recurring expense:", error);
    throw error;
  }
};

export const deleteRecurringExpense = async (uid, expenseId) => {
  try {
    const expenseRef = doc(db, "users", uid, "recurringExpenses", expenseId);
    const { deleteDoc } = await import("firebase/firestore");
    await deleteDoc(expenseRef);
  } catch (error) {
    console.error("Firestore Failure: Error deleting recurring expense:", error);
    throw error;
  }
};

export const subscribeToRecurringExpenses = (uid, callback) => {
  const expensesRef = collection(db, "users", uid, "recurringExpenses");
  const q = query(expensesRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const expenses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(expenses);
  });
};

// Profile
export const createUserProfile = async (uid, profileData) => {
  try {
    const profileRef = doc(db, "users", uid, "profile", "main");
    await setDoc(profileRef, {
      ...profileData,
      uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { merge: true });
    console.log("Firestore Success: Profile created for UID:", uid);
  } catch (error) {
    console.error("Firestore Failure: Error creating profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (uid, profileData) => {
  try {
    const profileRef = doc(db, "users", uid, "profile", "main");
    await updateDoc(profileRef, {
      ...profileData,
      updatedAt: new Date().toISOString()
    });
    console.log("Firestore Success: Profile updated for UID:", uid);
  } catch (error) {
    console.error("Firestore Failure: Error updating profile:", error);
    throw error;
  }
};

export const subscribeToProfile = (uid, callback) => {
  const profileRef = doc(db, "users", uid, "profile", "main");
  return onSnapshot(profileRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      callback(null);
    }
  }, (error) => {
    console.error("Firestore Failure: Profile subscription error:", error);
  });
};

// Preferences
export const createUserPreferences = async (uid, preferencesData) => {
  try {
    const preferencesRef = doc(db, "users", uid, "preferences", "main");
    await setDoc(preferencesRef, {
      ...preferencesData,
      uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { merge: true });
    console.log("Firestore Success: Preferences created for UID:", uid);
  } catch (error) {
    console.error("Firestore Failure: Error creating preferences:", error);
    throw error;
  }
};

export const getUserPreferences = async (uid) => {
  const preferencesRef = doc(db, "users", uid, "preferences", "main");
  const docSnap = await getDoc(preferencesRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateUserPreferences = async (uid, preferencesData) => {
  try {
    const preferencesRef = doc(db, "users", uid, "preferences", "main");
    await updateDoc(preferencesRef, {
      ...preferencesData,
      updatedAt: new Date().toISOString()
    });
    console.log("Firestore Success: Preferences updated for UID:", uid);
  } catch (error) {
    console.error("Firestore Failure: Error updating preferences:", error);
    throw error;
  }
};

export const subscribeToPreferences = (uid, callback) => {
  const preferencesRef = doc(db, "users", uid, "preferences", "main");
  return onSnapshot(preferencesRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      callback(null);
    }
  }, (error) => {
    console.error("Firestore Failure: Preferences subscription error:", error);
  });
};

// Security
export const createUserSecuritySettings = async (uid, securityData) => {
  try {
    const securityRef = doc(db, "users", uid, "security", "main");
    await setDoc(securityRef, {
      ...securityData,
      uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { merge: true });
    console.log("Firestore Success: Security settings created for UID:", uid);
  } catch (error) {
    console.error("Firestore Failure: Error creating security settings:", error);
    throw error;
  }
};

export const getUserSecuritySettings = async (uid) => {
  const securityRef = doc(db, "users", uid, "security", "main");
  const docSnap = await getDoc(securityRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateUserSecuritySettings = async (uid, securityData) => {
  try {
    const securityRef = doc(db, "users", uid, "security", "main");
    await updateDoc(securityRef, {
      ...securityData,
      updatedAt: new Date().toISOString()
    });
    console.log("Firestore Success: Security settings updated for UID:", uid);
  } catch (error) {
    console.error("Firestore Failure: Error updating security settings:", error);
    throw error;
  }
};

export const subscribeToSecuritySettings = (uid, callback) => {
  const securityRef = doc(db, "users", uid, "security", "main");
  return onSnapshot(securityRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      callback(null);
    }
  }, (error) => {
    console.error("Firestore Failure: Security settings subscription error:", error);
  });
};

// Notifications
export const addNotification = async (uid, notificationData) => {
  if (!uid) {
    console.error("addNotification validation failed: Missing uid");
    throw new Error("User ID is required to add a notification");
  }
  if (!notificationData || typeof notificationData !== 'object') {
    console.error("addNotification validation failed: Invalid notificationData object");
    throw new Error("Notification data must be an object");
  }
  
  const { title, message, type } = notificationData;
  if (!title || !message || !type) {
    console.error("addNotification validation failed: Missing title, message, or type", notificationData);
    throw new Error("Notification title, message, and type are required");
  }

  try {
    const notificationsRef = collection(db, "users", uid, "notifications");
    const docRef = await addDoc(notificationsRef, {
      title,
      message,
      type,
      read: false,
      uid,
      createdAt: new Date().toISOString()
    });
    return docRef;
  } catch (error) {
    console.error("Firestore Failure in addNotification:", error);
    throw error;
  }
};

export const markNotificationRead = async (uid, notificationId) => {
  if (!uid || !notificationId) {
    console.error("markNotificationRead validation failed: Missing uid or notificationId");
    throw new Error("User ID and Notification ID are required");
  }
  try {
    const notificationRef = doc(db, "users", uid, "notifications", notificationId);
    await updateDoc(notificationRef, {
      read: true
    });
  } catch (error) {
    console.error("Firestore Failure in markNotificationRead:", error);
    throw error;
  }
};

export const markNotificationAsRead = markNotificationRead;

export const deleteNotification = async (uid, notificationId) => {
  if (!uid || !notificationId) {
    console.error("deleteNotification validation failed: Missing uid or notificationId");
    throw new Error("User ID and Notification ID are required");
  }
  try {
    const notificationRef = doc(db, "users", uid, "notifications", notificationId);
    const { deleteDoc } = await import("firebase/firestore");
    await deleteDoc(notificationRef);
  } catch (error) {
    console.error("Firestore Failure in deleteNotification:", error);
    throw error;
  }
};

export const clearNotifications = async (uid) => {
  if (!uid) {
    console.error("clearNotifications validation failed: Missing uid");
    throw new Error("User ID is required to clear notifications");
  }
  try {
    const notificationsRef = collection(db, "users", uid, "notifications");
    const q = query(notificationsRef);
    const querySnapshot = await getDocs(q);
    const { deleteDoc } = await import("firebase/firestore");
    const deletePromises = querySnapshot.docs.map(docSnap => deleteDoc(docSnap.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Firestore Failure in clearNotifications:", error);
    throw error;
  }
};

export const clearAllNotifications = clearNotifications;

export const subscribeToNotifications = (uid, callback) => {
  if (!uid) {
    console.error("subscribeToNotifications validation failed: Missing uid");
    throw new Error("User ID is required to subscribe to notifications");
  }
  const notificationsRef = collection(db, "users", uid, "notifications");
  const q = query(notificationsRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (querySnapshot) => {
    const notifications = [];
    querySnapshot.forEach((docSnap) => {
      notifications.push({ id: docSnap.id, ...docSnap.data() });
    });
    callback(notifications);
  }, (error) => {
    console.error("Firestore Failure in subscribeToNotifications:", error);
  });
};

export const addDocument = async (collectionName, data) => {
  const colRef = collection(db, collectionName);
  return await addDoc(colRef, data);
};

export const getDocuments = async (collectionName) => {
  const colRef = collection(db, collectionName);
  const querySnapshot = await getDocs(colRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const saveInsights = async (uid, insightsData) => {
  if (!uid) throw new Error("User ID is required to save insights");
  try {
    const insightsRef = doc(db, "users", uid, "insights", "main");
    await setDoc(insightsRef, {
      ...insightsData,
      updatedAt: new Date().toISOString()
    });
    console.log("Firestore Success: Insights saved for UID:", uid);
  } catch (error) {
    console.error("Firestore Failure in saveInsights:", error);
    throw error;
  }
};

export const subscribeToInsights = (uid, callback) => {
  if (!uid) throw new Error("User ID is required to subscribe to insights");
  const insightsRef = doc(db, "users", uid, "insights", "main");
  return onSnapshot(insightsRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      callback(null);
    }
  }, (error) => {
    console.error("Firestore Failure in subscribeToInsights:", error);
  });
};

export const saveInsightsList = async (uid, insightsList) => {
  if (!uid) throw new Error("User ID is required to save insights");
  try {
    const colRef = collection(db, "users", uid, "insights");
    
    // Delete existing documents in users/{uid}/insights to avoid duplicate/old ones
    const querySnapshot = await getDocs(colRef);
    const deletePromises = querySnapshot.docs.map(docSnap => deleteDoc(docSnap.ref));
    await Promise.all(deletePromises);

    // Save new insights
    const savePromises = insightsList.map(insight => 
      addDoc(colRef, {
        title: insight.title || '',
        description: insight.description || '',
        type: insight.type || 'budget',
        severity: insight.severity || 'medium',
        source: insight.source || 'local',
        read: insight.read !== undefined ? insight.read : false,
        createdAt: insight.createdAt || new Date().toISOString()
      })
    );
    await Promise.all(savePromises);
    console.log(`Firestore Success: Saved ${insightsList.length} insights for UID:`, uid);
  } catch (error) {
    console.error("Firestore Failure in saveInsightsList:", error);
    throw error;
  }
};

export const subscribeToInsightsList = (uid, callback) => {
  if (!uid) throw new Error("User ID is required to subscribe to insights list");
  const colRef = collection(db, "users", uid, "insights");
  const q = query(colRef, orderBy("createdAt", "desc"));
  
  return onSnapshot(q, (snapshot) => {
    const insights = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(`Firestore Success: Fetched ${insights.length} insights for UID:`, uid);
    callback(insights);
  }, (error) => {
    console.error("Firestore Failure in subscribeToInsightsList:", error);
  });
};
