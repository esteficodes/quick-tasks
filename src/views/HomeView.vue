<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center text-indigo-700">QuickTasks</h1>

    <form @submit.prevent="addTask" class="flex gap-2 mb-4">
      <input
        v-model="newTask"
        type="text"
        placeholder="What needs to be done?"
        class="flex-1 px-4 py-2 border rounded"
      />
      <button class="px-4 py-2 bg-indigo-600 text-white rounded flex items-center gap-1">
  <PlusIcon class="h-5 w-5" />
  Add
</button>

    </form>

    <ul class="space-y-2">
      <li
        v-for="task in taskStore.tasks"
        :key="task.id"
        class="flex items-center justify-between p-2 bg-white rounded shadow"
      >
        <div @click="taskStore.toggleTask(task.id)" class="cursor-pointer flex-1">
          <span :class="{ 'line-through text-gray-400': task.completed }">
            {{ task.text }}
          </span>
        </div>
        <button @click="taskStore.deleteTask(task.id)" class="text-red-500 hover:text-red-700">
  <TrashIcon class="h-5 w-5" />
</button>

      </li>
    </ul>

    <div class="text-sm text-gray-600 flex justify-between mt-4">
      <span>{{ remaining }} remaining</span>
      <button @click="clearAll" class="text-red-500 hover:underline">Clear All</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { PlusIcon, TrashIcon } from '@heroicons/vue/24/solid'


const taskStore = useTaskStore()
const newTask = ref('')

const addTask = () => {
  if (newTask.value.trim()) {
    taskStore.addTask(newTask.value.trim())
    newTask.value = ''
  }
}

const remaining = computed(() => taskStore.tasks.filter(t => !t.completed).length)

const clearAll = () => {
  taskStore.tasks = []
  taskStore.saveToLocalStorage()
}

onMounted(() => {
  taskStore.loadFromLocalStorage()
})
</script>



