import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

export const getUsers = functions.https.onRequest(async (req, res) => {
    try {
        const usersSnapshot = await db.collection("users").get();

        const users = usersSnapshot.docs.map((doc) => doc.data());

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users", error: error });
    }
});
