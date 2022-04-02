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
export default {
    data() {
        return {
            pontuacao: 0,
            configKonva: {
                width: width,
                height: heigth,
                fill: 'red',
            },
            pontuacaoConfig: {
                x: width - 300,
                y: 15,
                text: null,
                fontSize: 30,
                fontFamily: 'Calibri',
                fill: 'green',
            },
            // configCircle: {
            //     x: 100,
            //     y: 100,
            //     radius: 70,
            //     fill: "red",
            //     // stroke: "black",
            //     strokeWidth: 4
            // }
            circles: [],

        };
    },
    created() {
        this.pontuacaoConfig.text = `Pontuacao: ${this.pontuacao}`
        var i = 0;
        var speed = 500;
        setInterval(() => {
            if (i < 5) {
                this.circles.push({
                    id: i,
                    configCircle: {
                        x: this.setRandomRespawn(width),
                        y: this.setRandomRespawn(heigth),
                        radius: 0,
                        fill: "red",
                        // stroke: "black",
                        strokeWidth: 4,
                        visible: false
                    }
                })
                this.growCircle(i)
                i++;
            }

        }, speed);

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
            // this.circles[index].animation.stop()
            this.circles[index].configCircle.visible = false
            setTimeout(() => {
                this.circles[index].configCircle.lessThanMaximumRadius = false
                this.circles[index].configCircle.visible = true
            }, 1000);
            // this.circles[index].layer.visible(false)
            // this.circles[index].layer.setX(this.setRandomRespawn(width))
            // this.circles[index].layer.setY(this.setRandomRespawn(heigth))
        },
        growCircle(index) {
            setTimeout(() => {
                this.circles[index].layer = this.$refs.circles[index].getNode()
                this.circles[index].configCircle.visible = true
                this.circles[index].configCircle.lessThanMaximumRadius = false
                this.circles[index].animation = new Konva.Animation(() => {
                    // setInterval(() => {
                    var radiusSpeed = 0.1
                    if (this.circles[index].configCircle.lessThanMaximumRadius == false) {
                        this.circles[index].configCircle.radius = this.circles[index].configCircle.radius + radiusSpeed
                        if (this.circles[index].configCircle.radius >= 20) {
                            this.circles[index].configCircle.lessThanMaximumRadius = true
                        }
                    }
                    if (this.circles[index].configCircle.lessThanMaximumRadius == true) {
                        if (this.circles[index].configCircle.radius >= 1) {
                            this.circles[index].configCircle.radius = this.circles[index].configCircle.radius - radiusSpeed
                        }
                    }
                    if (this.circles[index].configCircle.radius < 1) {
                        // this.circles.splice(index, 1)
                        this.stopAnimation(index);
                        // this.circles[index].configCircle.lessThanMaximumRadius = true
                        // this.circles[index].configCircle.radius = 2
                    }
                    // }, 1000);

                }, this.circles[index].layer)
                this.circles[index].animation.start()
                return Konva

            }, 1000);
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