<template >
    <div class="bg-page">
        <v-stage :config="configKonva">
            <v-layer>
                <v-text ref="pontuacao" :config="pontuacaoConfig"></v-text>
            </v-layer>
            <v-layer ref="circles" v-for="(circle, index) in circles" :key="index">
                <v-circle :config="circle.configCircle" @click="clickingCircle(index)"></v-circle>
            </v-layer>
        </v-stage>
    </div>
</template>
<script>
import Konva from 'konva'
const width = window.innerWidth;
const heigth = window.innerHeight
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            pontuacao: 0,
            configKonva: {
                width: width,
                height: heigth,
            },
            pontuacaoConfig: {
                x: width - 300,
                y: 15,
                text: null,
                fontSize: 30,
                fontFamily: 'Calibri',
                fill: 'green',
            },
            circles: [],
            // simultaneousTargets: 10
        };
    },
    created() {
        this.pontuacaoConfig.text = `Pontuacao: ${this.pontuacao}`
        var i = 0;
        setInterval(() => {
            if (i < this.simultaneousTargets) {
                this.circles.push({
                    id: i,
                    configCircle: {
                        x: this.setRandomRespawn(width),
                        y: this.setRandomRespawn(heigth),
                        radius: 0,
                        fill: this.$store.getters.color,
                        // stroke: "black",
                        strokeWidth: 4,
                        visible: false
                    }
                })
                this.growCircle(i)
                i++;
            }

        }, 100);
    },
    methods: {
        clickingCircle(index) {
            this.stopAnimation(index)
            // this.this.pontuacao++
            this.pontuacaoConfig.text = `Pontuacao: ${this.pontuacao++}`;
        },
        setRandomRespawn(parameter) {
            return Math.random() * parameter;
        },
        stopAnimation(index) {
            this.circles[index].configCircle.visible = false
            this.circles[index].configCircle.x = this.setRandomRespawn(width)
            this.circles[index].configCircle.y = this.setRandomRespawn(heigth)
            setTimeout(() => {
                this.circles[index].configCircle.lessThanMaximumRadius = false
                this.circles[index].configCircle.visible = true
            }, this.speed);
        },
        growCircle(index) {
            setTimeout(() => {
                this.circles[index].layer = this.$refs.circles[index].getNode()
                this.circles[index].configCircle.visible = true
                this.circles[index].configCircle.lessThanMaximumRadius = false
                this.circles[index].animation = new Konva.Animation(() => {
                    var radiusSpeed = 0.2
                    if (this.circles[index].configCircle.lessThanMaximumRadius == false) {
                        this.circles[index].configCircle.radius = this.circles[index].configCircle.radius + radiusSpeed
                        if (this.circles[index].configCircle.radius >= this.maximumRadius) {
                            this.circles[index].configCircle.lessThanMaximumRadius = true
                        }
                    }
                    if (this.circles[index].configCircle.lessThanMaximumRadius == true) {
                        if (this.circles[index].configCircle.radius >= 1) {
                            this.circles[index].configCircle.radius = this.circles[index].configCircle.radius - radiusSpeed
                        }
                    }
                    if (this.circles[index].configCircle.radius < 1) {
                        this.stopAnimation(index);
                    }

                }, this.circles[index].layer)
                this.circles[index].animation.start()
                return Konva
            }, 1000);
        }
    }
    , computed: {
        ...mapGetters({
            color: 'color',
            maximumRadius: 'maximumRadius',
            speed: 'speed',
            simultaneousTargets: 'simultaneousTargets'
        })
    },
    watch: {
        color(newValue) { // watch it
            for (let i = 0; i < this.circles.length; i++) {
                this.circles[i].configCircle.fill = newValue
            }
        },
        simultaneousTargets(newValue, oldValue) { // watch it
            if (newValue < oldValue) {
                // var removeLayers = oldValue - newValue;
                for (let i = newValue; i < oldValue; i++) {
                    this.circles[i].layer.visible(false)
                }
            }
            if (newValue > oldValue) {
                for (let i = 0; i < this.simultaneousTargets; i++) {
                    if (this.circles[i].layer) {
                        this.circles[i].layer.visible(true)
                    }

                    // this.circles[i].layer.visible(true)
                }
                //     for (let i = 1; i < this.simultaneousTargets; i++) {
                //         if (this.circles[i].layer.visible() == false) {
                //             this.circles[i].layer.visible(true)
                //         }
                //     }
            }
            return newValue, oldValue
        }
    }

};

</script>
<style>
* {
    margin: 0;
}
.bg-page {
    background-color: black;
}
</style>