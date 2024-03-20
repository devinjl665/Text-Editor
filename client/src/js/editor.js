// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class CodeMirrorEditor {
  constructor() {
    this.initEditor();
    this.loadEditorContent();
    this.setupEventListeners();
  }

  initEditor() {
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });
  }

  async loadEditorContent() {
    try {
      const localData = localStorage.getItem('content');
      const data = await getDb();
      const content = data?.jata || localData || header;
      this.editor.setValue(content);
    } catch (error) {
      console.error('Error loading editor content:', error);
      // Handle the error appropriately, e.g., show a message to the user
    }
  }

  setupEventListeners() {
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      this.saveEditorContent();
    });
  }

  async saveEditorContent() {
    try {
      await putDb(localStorage.getItem('content'));
    } catch (error) {
      console.error('Error saving editor content:', error);
      // Handle the error appropriately, e.g., show a message to the user
    }
  }
}

