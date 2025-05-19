import QChallenge from '../models/quizChallenge.js';
import Student from '../models/student.js';
import Quiz from '../models/quiz.js';

// export const sendChallenge = async (req, res) => {
//   const { senderId, receiverId, quizId, status } = req.body;
//     console.log(senderId, receiverId, quizId, status);
//   try {
//     const challenge = await QChallenge.create({
//       senderId,
//       receiverId,
//       quizId,
//       status
//     });
//     res.status(201).json(challenge);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create challenge' });
//   }
// };

// export const sendChallenge = async (req, res) => {
//   const { senderId, receiverId, quizId, status } = req.body;
//   console.log(senderId, receiverId, quizId, status);

//   try {
//     // Check if a pending challenge already exists between the same users
//     const existingChallenge = await QChallenge.findOne({
//       senderId,
//       receiverId,
//       quizId,
//       status: "Pending"
//     });

//     if (existingChallenge) {
//       return res.status(400).json({
//         error: "Challenge already sent to this user and is still pending."
//       });
//     }

//     const challenge = await QChallenge.create({
//       senderId,
//       receiverId,
//       quizId,
//       status
//     });

//     res.status(201).json(challenge);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create challenge" });
//   }
// };



export const sendChallenge = async (req, res) => {
  const { senderId, receiverId, quizId, status } = req.body;

  try {
    // Check for existing pending challenge between sender and receiver
    const existingChallenge = await QChallenge.findOne({
      senderId,
      receiverId,
      status: 'Pending'
    });

    if (existingChallenge) {
      return res.status(400).json({ error: 'A pending challenge already exists between these users.' });
    }

    const challenge = await QChallenge.create({
      senderId,
      receiverId,
      quizId,
      status
    });

    res.status(201).json(challenge);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create challenge' });
  }
};

export const getChallengesByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const sent = await QChallenge.find({ senderId: userId })
      .populate('quizId')
      .populate('receiverId');

    const received = await QChallenge.find({ receiverId: userId })
      .populate('quizId')
      .populate('senderId');

    const formattedSent = sent.map(ch => ({
      challenge: {
        id: ch._id,
        title: ch.quizId.testName,
        description: ch.quizId.description,
      },
      friend: {
        id: ch.receiverId._id,
        name: ch.receiverId.fullName,
      },
      status: ch.status,
    }));

    const formattedReceived = received.map(ch => ({
      challenge: {
        id: ch._id,
        title: ch.quizId.testName,
        description: ch.quizId.description,
      },
      friend: {
        id: ch.senderId._id,
        name: ch.senderId.fullName,
      },
      status: ch.status === 'Pending' ? 'Received' : ch.status,
    }));

    res.status(200).json({
      sent: formattedSent,
      received: formattedReceived
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch challenges' });
  }
};

export const updateChallengeStatus = async (req, res) => {
  const { challengeId } = req.params;
  const { status } = req.body;

  try {
    const updated = await QChallenge.findByIdAndUpdate(
      challengeId,
      { status },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update challenge status' });
  }
};
