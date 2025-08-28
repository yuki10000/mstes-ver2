const sentenceList = [
  {
    sentenceId: 1,
    sentenceWordGroupList:
      [
        {
          wordGroupId: 1,
          contents: {
            upper: { contentType: 'none' as const },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: '太郎はポチに肉を与えます' },
              ],
            },
            lower: { contentType: 'none' as const },
          },
        }
      ]
  },
  {
    sentenceId: 2,
    sentenceWordGroupList:
      [
        {
          wordGroupId: 1,
          contents: {
            upper: { contentType: 'none' as const },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: '太郎' },
                { id: 2, isDropZone: false, wordText: 'は' },
              ],
            },
            lower: { contentType: 'none' as const },
          },
        },
        {
          wordGroupId: 2,
          contents: {
            upper: { contentType: 'none' as const },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: 'ポチ' },
                { id: 2, isDropZone: false, wordText: 'に' },
              ],
            },
            lower: { contentType: 'none' as const },
          },
        },
        {
          wordGroupId: 4,
          contents: {
            upper: { contentType: 'none' as const },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: '肉' },
                { id: 2, isDropZone: false, wordText: 'を' },
              ],
            },
            lower: { contentType: 'none' as const },
          },
        },
        {
          wordGroupId: 5,
          contents: {
            upper: { contentType: 'none' as const },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: '与え' },
                { id: 2, isDropZone: false, wordText: 'ます' },
              ],
            },
            lower: { contentType: 'none' as const },
          },
        },
      ]
  },
  {
    sentenceId: 3,
    sentenceWordGroupList:
      [
        {
          wordGroupId: 1,
          contents: {
            upper: { contentType: 'none' as const },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: 'Taro' },
                { id: 2, isDropZone: false, wordText: 'は' },
              ],
            },
            lower: { contentType: 'none' as const },
          },
        },
        {
          wordGroupId: 2,
          contents: {
            upper: { contentType: 'none' as const },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: 'Pochi' },
                { id: 2, isDropZone: false, wordText: 'に' },
              ],
            },
            lower: { contentType: 'none' as const },
          },
        },
        {
          wordGroupId: 3,
          contents: {
            upper: { contentType: 'none' as const },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: 'meat' },
                { id: 2, isDropZone: false, wordText: 'を' },
              ],
            },
            lower: { contentType: 'none' as const },
          },
        },
        {
          wordGroupId: 4,
          contents: {
            upper: { contentType: 'none' as const },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: 'gives' },
                { id: 2, isDropZone: false, wordText: 'ます' },
              ],
            },
            lower: { contentType: 'none' as const },
          },
        },
      ]
  },
  {
    sentenceId: 4,
    sentenceWordGroupList:
      [
        {
          wordGroupId: 1,
          contents: {
            upper: {
              contentType: 'none' as const
            },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: 'Taro' },
                { id: 2, isDropZone: false, wordText: 'は' },
              ],
            },
            lower: {
              contentType: 'label' as const,
              labelSettings: {
                labelText: 'S: 何/誰が・は',
                isLineUpper: true,
                isLineLower: false,
              },
            },
          },
        },
        {
          wordGroupId: 2,
          contents: {
            upper: { contentType: 'none' as const },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: 'Pochi' },
                { id: 2, isDropZone: false, wordText: 'に' },
              ],
            },
            lower: {
              contentType: 'label' as const,
              labelSettings: {
                labelText: 'IO: 何/誰に',
                isLineUpper: true,
                isLineLower: false,
              },
            },
          },
        },
        {
          wordGroupId: 3,
          contents: {
            upper: { contentType: 'none' as const },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: 'meat' },
                { id: 2, isDropZone: false, wordText: 'を' },
              ],
            },
            lower: {
              contentType: 'label' as const,
              labelSettings: {
                labelText: 'DO: 何/誰を',
                isLineUpper: true,
                isLineLower: false,
              },
            },
          },
        },
        {
          wordGroupId: 4,
          contents: {
            upper: { contentType: 'none' as const },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: 'gives' },
                { id: 2, isDropZone: false, wordText: 'ます' },
              ],
            },
            lower: {
              contentType: 'label' as const,
              labelSettings: {
                labelText: 'V: どうする',
                isLineUpper: true,
                isLineLower: false,
              },
            },
          },
        },
      ]
  },
  {
    sentenceId: 5,
    sentenceWordGroupList:
      [
        {
          wordGroupId: 1,
          contents: {
            upper: {
              contentType: 'label' as const,
              labelSettings: {
                labelText: 'S: 何/誰が・は',
                isLineUpper: false,
                isLineLower: true,
              },
            },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: 'Taro' },
                { id: 2, isDropZone: false, wordText: 'は' },
              ],
            },
            lower: {
              contentType: 'none' as const
            },
          },
        },
        {
          wordGroupId: 2,
          contents: {
            upper: {
              contentType: 'label' as const,
              labelSettings: {
                labelText: 'V: どうする',
                isLineUpper: false,
                isLineLower: true,
              },
            },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: 'gives' },
                { id: 2, isDropZone: false, wordText: 'ます' },
              ],
            },
            lower: {
              contentType: 'none' as const
            },
          },
        },
        {
          wordGroupId: 3,
          contents: {
            upper: {
              contentType: 'label' as const,
              labelSettings: {
                labelText: 'IO: 何/誰に',
                isLineUpper: false,
                isLineLower: true,
              },
            },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: 'Pochi' },
                { id: 2, isDropZone: false, wordText: 'に' },
              ],
            },
            lower: {
              contentType: 'none' as const
            },
          },
        },
        {
          wordGroupId: 4,
          contents: {
            upper: {
              contentType: 'label' as const,
              labelSettings: {
                labelText: 'DO: 何/誰を',
                isLineUpper: false,
                isLineLower: true,
              },
            },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: 'meat' },
                { id: 2, isDropZone: false, wordText: 'を' },
              ],
            },
            lower: {
              contentType: 'none' as const
            },
          },
        },
      ]
  },
  {
    sentenceId: 6,
    sentenceWordGroupList:
      [
        {
          wordGroupId: 1,
          contents: {
            upper: {
              contentType: 'none' as const
            },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: 'Taro' },
                { id: 2, isDropZone: false, wordText: 'は' },
              ],
            },
            lower: {
              contentType: 'none' as const
            },
          },
        },
        {
          wordGroupId: 2,
          contents: {
            upper: {
              contentType: 'none' as const
            },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: 'gives' },
                { id: 2, isDropZone: false, wordText: 'ます' },
              ],
            },
            lower: {
              contentType: 'none' as const
            },
          },
        },
        {
          wordGroupId: 3,
          contents: {
            upper: {
              contentType: 'none' as const
            },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: 'Pochi' },
                { id: 2, isDropZone: false, wordText: 'に' },
              ],
            },
            lower: {
              contentType: 'none' as const
            },
          },
        },
        {
          wordGroupId: 4,
          contents: {
            upper: {
              contentType: 'none' as const
            },
            middle: {
              contentType: 'wordGroupCard' as const,
              wordList: [
                { id: 1, isDropZone: false, wordText: 'meat' },
                { id: 2, isDropZone: false, wordText: 'を' },
              ],
            },
            lower: {
              contentType: 'none' as const
            },
          },
        },
      ]
  },
]

export default sentenceList
