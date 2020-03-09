<template>
  <div>
    <svg width="1000" height="1000">
      <g
          class="decade"
          v-for="decade in layoutData.children"
          :key="decade.data.name"
          :style="{
          transform: `translate(${decade.x}px, ${decade.y}px)`
        }"
      >
        <circle class="decade__circle" :r="decade.r" :fill="decade.data.color" :key="decade.decade"></circle>
        <text class="decade__label">{{ decade.data.name }}</text>
      </g>
    </svg>
<!--    <div class="controls">-->
<!--      <div class="control" v-for="decade in decades" :key="decade.name">-->
<!--        <label>{{ decade.name }}</label>-->
<!--        <input type="number" v-model="decade.amount" step="10" min="10">-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import { hierarchy, pack } from 'd3-hierarchy'
  export default {
    props: {
      movieList: Array
    },
    data() {
      return {
        // decades: [
        //   {
        //     name: 'Roses',
        //     amount: 30,
        //     color: '#cc2936'
        //   },
        //   {
        //     name: 'Tulips',
        //     amount: 40,
        //     color: '#00a03e'
        //   },
        //   {
        //     name: 'Daisies',
        //     amount: 15,
        //     color: '#2a93d4'
        //   }
        // ]
      }
    },
    computed: {
      transformeddecadeData() {
        return {
          name: 'Top Level',
          children: this.movieList.map(decade => ({
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

        // console.log('pack', pack().size([500, 500]).padding(10)(rootHierarchy).children)
        // Pack the circles inside the viewbox
        return pack().size([1000, 1000]).padding(10)(rootHierarchy)

      }
    },
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
    fill: #fff;
    font-weight: bold;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
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
