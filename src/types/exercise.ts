// 演習・文要素の型定義

export type ContentType = 'none' | 'label' | 'wordGroupCard';

export interface LabelSettings {
  labelText: string;
  isLineUpper: boolean;
  isLineLower: boolean;
}

export interface WordItem {
  id: number;
  isDropZone: boolean;
  wordText?: string;
  items?: WordGroup[]; // DropZoneの場合のみ
}

export interface WordGroupContents {
  upper: {
    contentType: ContentType;
    labelSettings?: LabelSettings;
    wordList?: WordItem[];
  };
  middle: {
    contentType: ContentType;
    labelSettings?: LabelSettings;
    wordList?: WordItem[];
  };
  lower: {
    contentType: ContentType;
    labelSettings?: LabelSettings;
    wordList?: WordItem[];
  };
}

export interface WordGroup {
  wordGroupId: number;
  contents: WordGroupContents;
}

export interface Sentence {
  sentenceId: number;
  sentenceWordGroupList: WordGroup[];
}
