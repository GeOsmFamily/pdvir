<template>
    <div
        class="InputImage__dropzone"
        :class="{ 'InputImage__dropzone--dragging': isDragging }"
        @drop.prevent="handleDrop"
        @dragenter.prevent="handleDragEnter"
        @dragover.prevent="handleDragOver"
        @dragleave.prevent="handleDragLeave"
        @click="triggerFileInput"
    >
        <img src="@/assets/images/importFilesIcon.svg" alt="">
        <p class="ml-2">
            {{$t('actors.form.drag')}}
            <span class="InputImage__dropzone__uploadLink">{{$t('actors.form.import')}}</span></p>
        <input
            ref="fileInput"
            type="file"
            multiple
            accept="image/*"
            class="d-none"
            @change="handleFileChange"
        />
    </div>

    <div>
        <span class="InputImage__errorMessage">{{ errorMessage }}</span>
    </div>

    <div v-if="selectedFiles.length" class="d-flex flex-wrap mt-3">
        <div v-for="(selectedFile, index) in selectedFiles":key="index" class="position-relative">
            <div @click="removeFile(index)" class="InputImage__dropzone__imageCloser">X</div>
            <img
                :src="selectedFile.preview"
                :alt="(selectedFile as any).name ? (selectedFile as ContentImageFromUserFile).name : ''"
                class="InputImage__dropzone__imageLoaded ma-2"
            />
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ContentImageType } from '@/models/enums/app/ContentImageType';
import type { ContentImageFromUserFile, ContentImageFromUrl } from '@/models/interfaces/ContentImage';
import { InputImageValidator } from '@/services/files/InputImageValidator';
import { type Ref, ref } from 'vue';

const selectedFiles: Ref<ContentImageFromUserFile[]> = ref([])
const emit = defineEmits(['updateFiles'])

const fileInput = ref(null)
const triggerFileInput = () => {
  (fileInput.value as any).click()
}
const isDragging = ref(false)
const handleDragEnter = () => {
  isDragging.value = true
}
const handleDragOver = (event: Event) => {
  event.preventDefault()
}
const handleDragLeave = (event: any) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
        isDragging.value = false
    }
}
const handleDrop = (event: any) => {
  const files = event.dataTransfer.files
  handleFileChange({ target: { files } })
}

const errorMessage = ref('')
const handleFileChange = (event: any) => {
  const files: FileList = event.target.files
  Array.from(files).forEach((file) => {
    const fileStatus = InputImageValidator.validateImageFromFile(file, selectedFiles.value)
    if (fileStatus.isValid) {
        const preview = URL.createObjectURL(file)
        selectedFiles.value.push({ 
            type: ContentImageType.CONTENT_IMAGE_FROM_USER_FILE,
            name: (file).name,
            preview: preview, 
            file: file
        })
    } else {
        errorMessage.value = fileStatus.message
        window.setTimeout(() => {
            errorMessage.value = ''
        }, 3000)
    }
  })
  emit('updateFiles', selectedFiles.value)
}
const removeFile = (index: number) => {
    selectedFiles.value.splice(index, 1)
}
</script>

<style lang="scss">
.InputImage {
    &__dropzone{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 20px 50px;
        background-color: rgb(var(--v-theme-light-yellow));
        &--dragging{
            border: 2px dashed rgb(var(--v-theme-main-yellow));
        }
        &__uploadLink{
            color: rgb(var(--v-theme-main-blue));
            cursor: pointer;
            text-decoration: underline;
        }
        &__imageCloser{
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgb(var(--v-theme-main-red));
            height: 24px;
            width: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: white;
        }
        &__imageLoaded{
            width: 100px;
        }
    }
    &__errorMessage{
        color: rgb(var(--v-theme-main-red));
        font-size: $font-size-xs;
    }
}
</style>