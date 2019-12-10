<template />

<script>
// import audioPreview from '@/components/shared/audioPreview'
// import videoPreview from '@/components/shared/previewVideo'

export default {
  meta: {
    requiresAuth: true,
  },
  layout: 'business-layout',
  head: {
    title: 'File Preview',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },


};
</script>
