import express from 'express';
import { prisma } from '../utils/prisma/index.js';

// character.js
const express = require('express');
const router = express.Router();

router.post('/create-character', async (req, res) => {
  const { userId, characterName, characterClass } = req.body;

  // 캐릭터 이름 중복 체크
  const isExistCharacter = await prisma.characters.findFirst({
    where: { userId, name: characterName },
  });

  if (isExistCharacter) {
    return res.status(409).json({ message: '이미 존재하는 캐릭터 이름입니다.' });
  }

  // 캐릭터 생성 로직
  const newCharacter = await prisma.characters.create({
    data: { userId, name: characterName, class: characterClass },
  });
  return res.status(201).json({ message: '캐릭터 생성 성공', character: newCharacter });
});

export default router;
