<template>
  <footer
    class="py-4 bg-gray w-100"
    style="height: 80px">
    <Container>
      <FlexBox
        align-items="center"
        justify="between">
        <FlexBox align-items="baseline">
          <span class="mr-2 text-small text-muted">Powered By</span>
          <NuxtLink to="/">
            <PaperDazIcon size="30" />
          </NuxtLink>
        </FlexBox>

        <p class="mb-0 text-small text-muted">
          2019 © PAPERDAZ | All Rights Reserved
        </p>

        <FlexBox class="icons-group">
          <img
            src="../../assets/img/icons/paperless.svg"
            alt="Paperless">
          <img
            src="../../assets/img/icons/printless.svg"
            alt="Printless">
          <img
            src="../../assets/img/icons/uploadless.svg"
            alt="Uploadless">
          <img
            src="../../assets/img/icons/downloadless.svg"
            alt="Downloadless">
          <img
            src="../../assets/img/icons/duplicateless.svg"
            alt="Duplicateless">
          <img
            src="../../assets/img/icons/duplicateless.svg"
            alt="Duplicateless">
        </FlexBox>
      </FlexBox>
    </Container>
  </footer>
</template>

<script>
import PaperDazIcon from '../../components/svg/PaperDazIcon';
import Container from '../../components/base/Container';
import FlexBox from '../../components/base/FlexBox';

export default {
  name: 'Footer',
  components: { FlexBox, Container, PaperDazIcon },
};
</script>

<style scoped>
  .icons-group img {
    margin: 0 0.5rem;
  }
</style>
