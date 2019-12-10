<template functional>
  <table class="table mdc-elevation--z1">
    <thead>
      <slot name="head-table" />
    </thead>
    <tbody>
      <slot name="body-table" />
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'BaseTable',
};
</script>

<style lang="scss" scoped>
  @import "~@material/elevation/mdc-elevation";

  $table-color: hsl(0, 0%, 21%) !default;
  $table-background-color: white !default;

  $table-cell-border: 1px solid hsl(0, 0%, 86%) !default;
  $table-cell-border-width: 0 0 1px !default;
  $table-cell-padding: 0.5em 0.75em !default;
  $table-cell-heading-color: hsl(0, 0%, 21%) !default;

  $table-head-cell-border-width: 0 0 4px !default;
  $table-head-cell-color: hsl(0, 0%, 21%) !default;
  $table-foot-cell-border-width: 2px 0 0 !default;
  $table-foot-cell-color: hsl(0, 0%, 21%) !default;

  $table-head-background-color: #fff !default;
  $table-body-background-color: #fff !default;
  $table-foot-background-color: transparent !default;

  $table-row-hover-background-color: red !default;

  $table-row-active-background-color: hsl(171, 100%, 41%) !default;
  $table-row-active-color: hsl(141, 71%, 48%) !default;

  $table-striped-row-even-background-color: hsl(0, 0%, 98%) !default;
  $table-striped-row-even-hover-background-color: hsl(0, 0%, 96%) !default;

  .table {
    border-radius: 4px;
    overflow: auto;
    overflow-y: hidden;
    background-color: $table-background-color;
    color: $table-color;

    td,
    th {
      border: $table-cell-border;
      border-width: $table-cell-border-width;
      padding: $table-cell-padding;

      // Modifiers
      &.is-narrow {
        white-space: nowrap;
        width: 1%;
      }

      &.is-selected {
        background-color: $table-row-active-background-color;
        color: $table-row-active-color;

        a,
        strong {
          color: currentColor;
        }
      }
    }

    th {
      color: $table-cell-heading-color;

      &:not([align]) {
        text-align: left;
      }
    }

    tr {
      &.is-selected {
        background-color: $table-row-active-background-color;
        color: $table-row-active-color;

        a,
        strong {
          color: currentColor;
        }

        td,
        th {
          border-color: $table-row-active-color;
          color: currentColor;
        }
      }
    }

    thead {
      background-color: $table-head-background-color;

      td,
      th {
        border-width: $table-head-cell-border-width;
        color: $table-head-cell-color;
      }
    }

    tfoot {
      background-color: $table-foot-background-color;

      td,
      th {
        border-width: $table-foot-cell-border-width;
        color: $table-foot-cell-color;
      }
    }

    tbody {
      background-color: $table-body-background-color;

      tr {
        &:last-child {
          td,
          th {
            border-bottom-width: 0;
          }
        }
      }
    }

    // Modifiers
    &.is-bordered {
      td,
      th {
        border-width: 1px;
      }

      tr {
        &:last-child {
          td,
          th {
            border-bottom-width: 1px;
          }
        }
      }
    }

    &.is-fullwidth {
      width: 100%;
    }

    &.is-hoverable {
      tbody {
        tr:not(.is-selected) {
          &:hover {
            background-color: $table-row-hover-background-color;
          }
        }
      }

      &.is-striped {
        tbody {
          tr:not(.is-selected) {
            &:hover {
              background-color: $table-row-hover-background-color;

              &:nth-child(even) {
                background-color: $table-striped-row-even-hover-background-color;
              }
            }
          }
        }
      }
    }

    &.is-narrow {
      td,
      th {
        padding: 0.25em 0.5em;
      }
    }

    &.is-striped {
      tbody {
        tr:not(.is-selected) {
          &:nth-child(even) {
            background-color: $table-striped-row-even-background-color;
          }
        }
      }
    }
  }

  @media screen and (max-width: 550px) {
    .table {
      display: block;
    }
  }
</style>
