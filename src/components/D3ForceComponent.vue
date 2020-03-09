<template>
  <div>
    <svg ref="bubble-chart" width="800" height="800">
      <g
          class="decade"
          :id="decade.data.id"
          v-for="decade in layoutData.children"
          :key="decade.data.id"
          :style="{
          transform: `translate(${decade.x}px, ${decade.y}px)`
        }"
      >
        <circle class="decade__circle" :r="decade.r" :fill="decade.data.color" :key="decade.id">
        </circle>
        <text class="decade__label">{{decade.data.elements.length}} top film in {{ decade.data.name }}
        </text>
      </g>
    </svg>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import * as dd from "d3"
  import { hierarchy, pack } from 'd3-hierarchy'
  export default {
    props: {
      dataForBubbleChart: Array
    },
    data() {
      return {
        width: null,
        height: null
      }
    },
    computed: {
      transformeddecadeData() {
        return {
          name: 'Top Level',
          children: this.dataForBubbleChart.map(decade => ({
            ...decade,
            size: decade.amount,
            parent: 'Top Level'
          }))
        }
      },
      layoutData() {
        // Generate a D3 hierarchy
        const rootHierarchy = hierarchy(this.transformeddecadeData)
          .sum(d => d.size)
          .sort((a, b) => {
            return b.value - a.value
          })

        // Pack the circles inside the viewbox
        return pack().size([800, 800]).padding(10)(rootHierarchy)

      }
    },
    methods: {
    },
    created() {
    }
  }
</script>

<style>
  body {
    font: 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif;
  }

  svg {
    display: block;
    margin: 0 auto;
  }

  .decade {
    transition: transform 0.2s ease-in-out;
    text-anchor: middle;
  }

  .decade__circle {
    transition: r 0.2s ease-in-out;
  }

  .decade__label {
    fill: #9c9c9c;
    text-shadow:
        -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000;
  }

  .controls {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .control {
    display: inline-flex;
    flex-direction: column;
    margin: 0 4px;
  }

  .control label {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 4px;
  }

  .control input {
    display: block;
    font: inherit;
    width: 100px;
  }
</style>
