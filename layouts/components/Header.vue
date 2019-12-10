<template>
  <nav class="py-4">
    <Container>
      <FlexBox justify="between">
        <NuxtLink to="/">
          <PaperDazIcon
            v-if="!isLogged"
            size="45" />
        </NuxtLink>

        <FlexBox
          v-if="!isLogged"
          class="buttons-group">
          <Button
            color="primary"
            size="large"
            class="mr-2"
            @click="$emit('login')">
            Login
          </Button>

          <AButton
            type="default"
            size="large"
            @click="$emit('register')">
            Sign up
          </AButton>
        </FlexBox>

        <FlexBox
          v-else
          direction="column"
          align-items="center">
          <div class="position-relative">
            <AvatarImage
              :path="user.avatar"
              class="medium" />
            <span class="active-icon text-xl position-absolute">●</span>
          </div>

          <p class="mb-0 mt-1">
            {{ user.name }}
          </p>
        </FlexBox>
      </FlexBox>
    </Container>
  </nav>
</template>

<script>
import PaperDazIcon from '../../components/svg/PaperDazIcon';
import Button from '../../components/form/Button';
import FlexBox from '../../components/base/FlexBox';
import Container from '../../components/base/Container';
import AvatarImage from '../../components/elements/AvatarImage';

export default {
  layout: 'default',
  name: 'Header',
  components: {
    AvatarImage,
    Container,
    FlexBox,
    Button,
    PaperDazIcon,
  },
  props: {
    isLogged: {
      type: Boolean,
    },
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style scoped>
  .active-icon {
    top: 10px;
    right: 0;
    line-height: 0;
    color: #00e635;
  }
</style>
