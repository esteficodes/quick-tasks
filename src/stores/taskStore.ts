import { defineStore } from 'pinia'

export interface Task {
  id: number
  text: string
  completed: boolean
}

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
  }),

  actions: {
    addTask(text: string) {
      this.tasks.push({
        id: Date.now(),
        text,
        completed: false,
      })
      this.saveToLocalStorage()
    },
    toggleTask(id: number) {
      const task = this.tasks.find(t => t.id === id)
      if (task) {
        task.completed = !task.completed
        this.saveToLocalStorage()
      }
    },
    deleteTask(id: number) {
      this.tasks = this.tasks.filter(t => t.id !== id)
      this.saveToLocalStorage()
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem('tasks')
      if (data) {
        this.tasks = JSON.parse(data)
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
  }
})

