<template >
    <div>
        <v-btn color="primary" class="ma-2 btnConfig" dark @click="dialog2 = true">
            <v-icon dark>mdi-wrench</v-icon>
        </v-btn>
        <v-dialog v-model="dialog2" max-width="500px">
            <v-card dark>
                <v-card-title>Opções de jogabilidade</v-card-title>
                <v-card-actions class="flex-row">
                    <div class="card-title">Cor do alvo:</div>
                    <v-text-field v-model="color" hide-details class="ma-0 pa-0" solo>
                        <template v-slot:append>
                            <v-menu
                                v-model="menu"
                                top
                                nudge-bottom="105"
                                nudge-left="16"
                                :close-on-content-click="false"
                            >
                                <template v-slot:activator="{ on }">
                                    <div :style="swatchStyle" v-on="on" />
                                </template>
                                <v-card>
                                    <v-card-text class="pa-0">
                                        <v-color-picker v-model="color" flat />
                                    </v-card-text>
                                </v-card>
                            </v-menu>
                        </template>
                    </v-text-field>
                </v-card-actions>
                <v-card-actions class="flex-row">
                    <div class="card-title">Tempo de respawn:</div>
                    <v-slider
                        v-model="speed"
                        color="orange"
                        hint="Be honest"
                        min="100"
                        max="2000"
                        thumb-label
                    ></v-slider>
                </v-card-actions>
                <v-card-actions class="flex-row">
                    <div class="card-title">Tamanho Máximo do alvo:</div>
                    <v-select :items="maximumSize" v-model="maximunSizeSelected" label="Standard"></v-select>
                </v-card-actions>
                 <v-card-actions class="flex-row">
                    <div class="card-title">Número máximo de alvos simultaneos</div>
                    <v-select :items="maximumsimultaneousTargets" v-model="simultaneousTargets" label="Standard"></v-select>
                </v-card-actions>

                <v-card-actions class="flex-row justify-space-around">
                    <v-btn color="primary" class="ma-2" dark @click="save">Salvar</v-btn>
                    <v-btn color="secondary" class="ma-2" dark @click="redefine">Redefinir</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
// import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            maximunSizeSelected: this.$store.getters.maximumRadius,
            dialog2: true,
            color: this.$store.getters.color,
            menu: false,
            maximumSize: [],
            speed: this.$store.getters.speed,
            simultaneousTargets: this.$store.getters.simultaneousTargets,
            maximumsimultaneousTargets: []
        }
    },
    methods: {
        redefine() {

        },
        save() {
            this.$store.dispatch('changeColor', this.color)
            this.$store.dispatch('changeMaximumRadius', this.maximunSizeSelected)
            this.$store.dispatch('changeSpeed', this.speed)
            this.$store.dispatch('changeSimultaneousTargets', this.simultaneousTargets)
            this.dialog2 = false
        }
    },
    computed: {
        //  ...mapGetters({
        //     color: 'color',
        //     maximumRadius: 'maximumRadius',
        //     speed: 'speed',
        //     simultaneousTargets: 'simultaneousTargets'
        // }),
        swatchStyle() {
            const { color, menu } = this
            return {
                backgroundColor: color,
                cursor: 'pointer',
                height: '30px',
                width: '30px',
                borderRadius: menu ? '50%' : '4px',
                transition: 'border-radius 200ms ease-in-out'
            }
        }
    },
    created() {
        for (let i = 10; i <= 30; i++) {
            this.maximumSize.push(i)
        }
        for (let i = 1; i <= 10; i++) {
            this.maximumsimultaneousTargets.push(i)
        }
    }

}
</script>
<style scoped>
.btnConfig {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 2;
}
.card-title {
    margin-right: 10px;
    font-size: 1.1rem;
}
</style>