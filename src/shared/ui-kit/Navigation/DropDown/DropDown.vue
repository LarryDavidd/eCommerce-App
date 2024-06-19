<script setup lang="ts"></script>

<template>
  <div class="dropdown">
    <slot name="main" />
    <div class="dropdown-popup">
      <div class="dropdown-popup-inner">
        <slot name="dropdown" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.dropdown {
  position: relative;

  &:hover {
    .dropdown {
      &-popup {
        transform: translateY(100%);
        opacity: 1;
        visibility: visible;
      }
    }
  }

  &-popup {
    z-index: 1;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 32px;

    transform: translateY(calc(100% + 10px));
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    &-popup-inner {
      margin-top: 4px;
    }
  }
}
.dropdown {
  height: fit-content;
  display: flex;
  min-width: 100px;
  justify-content: center;
}
.dropdown-popup-inner {
  row-gap: 7px;
  align-items: center;
  flex-direction: column;
  display: flex;
  list-style: none;
}
.user-icon {
  cursor: pointer;
}
.dropdown-popup {
  font-weight: 500;
  color: #515151;
  padding: 8px;
  width: 100%;
  list-style: none;
  border-radius: 7px;
  background-color: white;
  border: 1px solid #393a39;
}
</style>
