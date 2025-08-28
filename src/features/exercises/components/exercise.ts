import sentenceList from './sentenceList'

// referenceSentenceWordGroupList: sentenceId=1 の要素をそのまま格納
export const referenceSentenceWordGroupList = sentenceList.find(s => s.sentenceId === 1)?.sentenceWordGroupList || []

export const sentenceWordGroupList = [
  {
    wordGroupId: 1,
    contents: {
      upper: { contentType: 'none' },
      middle: {
        contentType: 'wordGroupCard',
        wordList: [
          { id: 1, isDropZone: true, wordText: '猫' },
          { id: 2, isDropZone: false, wordText: 'は' },
        ],
      },
      lower: { contentType: 'none' },
    },
  },
  {
    wordGroupId: 2,
    contents: {
      upper: { contentType: 'none' },
      middle: {
        contentType: 'wordGroupCard',
        wordList: [
          { id: 3, isDropZone: true },
          { id: 4, isDropZone: false, wordText: 'に' },
        ],
      },
      lower: { contentType: 'none' },
    },
  },
  {
    wordGroupId: 4,
    contents: {
      upper: { contentType: 'none' },
      middle: {
        contentType: 'wordGroupCard',
        wordList: [
          { id: 5, isDropZone: true },
          { id: 6, isDropZone: false, wordText: 'を' },
        ],
      },
      lower: { contentType: 'none' },
    },
  },
  {
    wordGroupId: 5,
    contents: {
      upper: { contentType: 'none' },
      middle: {
        contentType: 'wordGroupCard',
        wordList: [
          { id: 7, isDropZone: true },
          { id: 8, isDropZone: false, wordText: 'ます' },
        ],
      },
      lower: { contentType: 'none' },
    },
  },
]

export const draggableWordGroupList = [
  {
    wordGroupId: 6,
    contents: {
      upper: { contentType: 'none' },
      middle: {
        contentType: 'wordGroupCard',
        wordList: [
          { id: 9, isDropZone: false, wordText: '太郎' }
        ],
      },
      lower: { contentType: 'none' },
    }
  },
  {
    wordGroupId: 7,
    contents: {
      upper: { contentType: 'none' },
      middle: {
        contentType: 'wordGroupCard',
        wordList: [
          { id: 10, isDropZone: false, wordText: 'ポチ' }
        ],
      },
      lower: { contentType: 'none' },
    }
  },
  {
    wordGroupId: 8,
    contents: {
      upper: { contentType: 'none' },
      middle: {
        contentType: 'wordGroupCard',
        wordList: [
          { id: 11, isDropZone: false, wordText: '肉' }
        ],
      },
      lower: { contentType: 'none' },
    }
  },
  {
    wordGroupId: 9,
    contents: {
      upper: { contentType: 'none' },
      middle: {
        contentType: 'wordGroupCard',
        wordList: [
          { id: 12, isDropZone: false, wordText: '与え' }
        ],
      },
      lower: { contentType: 'none' },
    }
  },
]
