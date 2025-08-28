import sentenceList from './sentenceList'

// 1. referenceSentenceWordGroupList: sentenceId=1 の要素をそのまま格納
export const referenceSentenceWordGroupList = sentenceList.find(s => s.sentenceId === 1)?.sentenceWordGroupList || []

// 2. sentenceWordGroupList: sentenceId=2 の各wordGroupでwordListのid=1をdropzone化
export const sentenceWordGroupList = (sentenceList.find(s => s.sentenceId === 2)?.sentenceWordGroupList || []).map(group => {
  // wordListのid=1をdropzoneに
  const newGroup = JSON.parse(JSON.stringify(group))
  if (newGroup.contents && newGroup.contents.middle && Array.isArray(newGroup.contents.middle.wordList)) {
    newGroup.contents.middle.wordList = newGroup.contents.middle.wordList.map(item => {
      if (item.id === 1) {
        return {
          ...item,
          isDropZone: true,
          items: [],
        }
      }
      return item
    })
  }
  return newGroup
})

// 3. draggableWordGroupList: sentenceId=2 の各wordGroupでwordListのid=1をカード化
export const draggableWordGroupList = (sentenceList.find(s => s.sentenceId === 2)?.sentenceWordGroupList || []).map(group => {
  // wordListのid=1のみをカードとして抽出
  const item = group.contents?.middle?.wordList?.find((w: any) => w.id === 1)
  if (item) {
    return {
      wordGroupId: group.wordGroupId,
      contents: {
        upper: { contentType: 'none' },
        middle: {
          contentType: 'wordGroupCard',
          wordList: [
            { ...item, isDropZone: false },
          ],
        },
        lower: { contentType: 'none' },
      },
    }
  }
  return null
}).filter(Boolean)
