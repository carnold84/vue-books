<template>
  <div class="list-item">
    <div class="cell">
      <slot name="cell1"></slot>
    </div>
    <div class="cell">
      <slot name="cell2"></slot>
    </div>
    <div class="cell">
      <slot name="cell3"></slot>
    </div>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListItem",
};
</script>

<style lang="scss" scoped>
@import "@/styles/_include-media.scss";

.list-item {
  height: 50px;
  padding: 0 10px;
  border-bottom: #eeeeee solid 1px;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  display: flex;

  &:first-child {
    border-top: #eeeeee solid 1px;
  }
}
.cell {
  height: 100%;
  padding: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  align-items: center;
  display: flex;

  &:nth-child(1) {
    flex-grow: 1;
  }
  &:nth-child(2) {
    flex-basis: 40%;
  }
  &:nth-child(3) {
    flex-basis: 25%;
  }
}
.actions {
  padding: 0 0 0 10px;
  align-items: center;
  flex-shrink: 1;
  display: flex;
}
.actions > * {
  margin: 0 10px 0 0;
}
.actions > :last-child {
  margin: 0;
}
@include media("<=tablet") {
  .list-item {
    height: auto;
    padding: 14px;
    margin: 0 0 10px;
    border: #eeeeee solid 1px;
    grid-template-columns: 28% 28% 28% 16%;
    grid-template-rows: 26px 26px 26px;
    display: grid;
  }
  .cell {
    padding: 0;
    white-space: nowrap;
    overflow: hidden;

    &:nth-child(1) {
      grid-column-start: 1;
      grid-column-end: 4;
      grid-row-start: 1;
      grid-row-end: 1;
    }
    &:nth-child(2) {
      grid-column-start: 1;
      grid-column-end: 4;
      grid-row-start: 2;
      grid-row-end: 2;
    }
    &:nth-child(3) {
      grid-column-start: 1;
      grid-column-end: 4;
      grid-row-start: 3;
      grid-row-end: 3;
    }
  }
  .actions {
    grid-column-start: 4;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 4;
    padding: 0 0 0 10px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    > * {
      margin: 0 0 10px 0;
    }
  }
}
</style>
<style lang="scss">
.list-item {
  .cell {
    a {
      height: 100%;
      margin: 0 10px 0 0;
      white-space: nowrap;
      overflow: hidden;
      align-items: center;
      display: flex;
    }
    a:last-child {
      margin: 0;
    }
    .title-text {
      border-bottom-style: dotted;
      border-bottom-width: 1px;
      border-bottom-color: var(--primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    a:hover .title-text {
      border-bottom-color: var(--secondary);
    }
  }
}
</style>
