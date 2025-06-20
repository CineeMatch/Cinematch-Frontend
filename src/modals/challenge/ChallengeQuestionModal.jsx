import React, { useState } from 'react';
import { Box, Typography, IconButton, Modal } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {getChallengeQuestionsCurrentUserByChallengeId, answerChallengeQuestion} from '../../api/challenge/challengeQuestion';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function ChallengeQuestionModal({ open, onClose, challenge }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

useEffect(() => {
    if (open && challenge?.challenge_Id) {
      getChallengeQuestionsCurrentUserByChallengeId(challenge.challenge_Id)
        .then((data) => {
          setQuestions(data);
          setAnswers(data.map(q => ({ id: q.id, selected_answer: null })));
        })
        .catch(err => console.error(err));
        toast.info("Karşı Tarafın Soruları yüklenmesi bekleniyor...");
    }
  }, [open, challenge]);

  const handleAnswer = (isCorrect) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex].selected_answer = isCorrect;

    setAnswers(updatedAnswers);

    // Otomatik sonraki soruya geç
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Tüm sorular bittiyse cevapları gönder
      console.log("Submitting answers:", updatedAnswers);
      answerChallengeQuestion(updatedAnswers)
        .then(() => {
          console.log("Answers submitted successfully.");
          onClose();
        })
        .catch(err => {
          console.error("Answer submission error:", err);
          onClose(); // Hata olsa bile modal kapanabilir
        });
    }
  };

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 400,
    boxShadow: 24,
    p: 0,
    border: 'none',
    background: 'linear-gradient(to bottom,rgb(55, 9, 9),rgb(0, 0, 0))',
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style }}>
        <Box
          sx={{
            margin: '0 auto',
            mt: 4,
            position: 'relative',
            paddingTop: '40px',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(to bottom, #202020, #121212)',
              padding: 4,
              borderRadius: 2,
              color: 'white',
              boxShadow: '0 0 15px rgba(199, 188, 188, 0.4)',
              width: 550,
              height: 230,
            }}
          >
            {/* Başlık ve yön okları */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
              <IconButton
                onClick={() => setCurrentIndex(i => i - 1)}
                disabled={currentIndex === 0}
                sx={{ color: "white" }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>

              <Typography variant="h5" textAlign="center" fontWeight="bold">
                QUESTION {currentIndex + 1}
              </Typography>

              <IconButton
                onClick={() => setCurrentIndex(prev => prev + 1)}
                disabled={currentIndex >= questions.length - 1}
                sx={{ color: "white" }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>

            {/* Soru */}
            <Typography
              variant="body1"
              fontWeight="500"
              sx={{ textAlign: 'center', marginBottom: 4 }}
            >
              {currentQuestion.questionText}
            </Typography>

            {/* Doğru/Yanlış ikonları */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <IconButton  onClick={() => handleAnswer(true)}>
                <CheckCircleIcon sx={{ fontSize: 50, color: 'limegreen' }} />
              </IconButton>
              <IconButton onClick={() => handleAnswer(false)}>
                <CancelIcon sx={{ fontSize: 50, color: 'red' }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
