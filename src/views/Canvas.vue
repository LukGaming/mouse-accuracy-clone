<template >
    <div class="bg-page">
        <v-stage :config="configKonva">
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
            configKonva: {
                width: width,
                height: heigth,
                fill: 'red',
            },
            // configCircle: {
            //     x: 100,
            //     y: 100,
            //     radius: 70,
            //     fill: "red",
            //     // stroke: "black",
            //     strokeWidth: 4
            // }
            circles: []
        };
    },
    created() {
        var i = 0;
        var speed = 1000;
        setInterval(() => {
            i++;
            this.circles.push({
                configCircle: {
                    x: this.setRandomRespawn(width),
                    y: this.setRandomRespawn(heigth),
                    radius: 5,
                    fill: "red",
                    // stroke: "black",
                    strokeWidth: 4
                }
            })
            this.growCircle(i)
        }, speed);

    },
    methods: {
        clickingCircle(index) {
            this.circles.splice(index, 1)
        },
        setRandomRespawn(parameter) {
            return Math.random() * parameter;
        },
        growCircle(index) {

            // this.circles[index].configCircle.radius = 200
            // this.circles[index].configCircle.radius = 120
            setTimeout(() => {
                if (this.circles[index]) {
                    var layer = this.$refs.circles[index].getNode()
                    this.circles[index].configCircle.lessThanMaximumRadius = false
                    let anim = new Konva.Animation(() => {
                        // setInterval(() => {
                        if (this.circles[index].configCircle.lessThanMaximumRadius == false) {
                            this.circles[index].configCircle.radius = this.circles[index].configCircle.radius + 0.1
                            if (this.circles[index].configCircle.radius >= 20) {
                                this.circles[index].configCircle.lessThanMaximumRadius = true
                            }
                        }
                        if (this.circles[index].configCircle.lessThanMaximumRadius == true) {
                            if (this.circles[index].configCircle.radius >= 1) {
                                this.circles[index].configCircle.radius = this.circles[index].configCircle.radius - 0.1
                            }
                        }
                        if (this.circles[index].configCircle.radius < 1) {
                            this.circles.splice(index, 1)
                        }

                        // }, 1000);

                    }, layer)
                    anim.start()
                    // layer.to({
                    //     innerRadius: 50,
                    //     // scaleX: 50,
                    //     // scaleY: Math.random() + 0.8,
                    //     duration: 0.2
                    // });
                    return Konva
                }
            }, 1000);


            // const anim = new Konva.Animation(function (frame) {
            //     hexagon.setX(
            //         amplitude * Math.sin((frame.time * 2 * Math.PI) / period) + centerX
            //     );
            // }, layer);


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