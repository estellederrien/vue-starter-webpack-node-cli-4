<template>
<div class="container-fluid">
    <div class="row">
        <div class="col-md-2">
            <h5>Entrer un nouvel évènement</h5>

             <label>Mon nom : </label> <br>
            <span class = "badge badge-primary">{{$user.nom || "Anonyme"}}</span><br><br>

            <label>Début : </label> <br>
            <datetime placeholder="Entrez un créneau" v-model="newEvent.start" type="datetime" :minute-step="30" :phrases="{ok: 'Ok', cancel: 'Annuler'}" title="Debut du rendez vous "></datetime>
            <br>

            <label>Fin : </label> <br>
            <datetime placeholder="Entrez un créneau" v-model="newEvent.end" type="datetime" :minute-step="30"></datetime>
            <br>
            <label>Titre : </label> <br>
            <input v-model="newEvent.title" class="form-control" type="text"></input>
            <br>
            <label>Description : </label> <br>
            <textarea v-model="newEvent.contentFull" class="form-control"></textarea>
            <br>
            <button @click="createEvent()" class="btn btn-primary">Ajouter</button>
        </div>
        <div class="col-md-10">
            <vue-cal style="height: 800px" locale="fr" ref="vuecal" :cell-click-hold="false" @cell-dblclick="$refs.vuecal.createEvent($event, { title: 'New Event', classes: ['blue-event'] })" hide-weekends :disable-views="['years', 'year']" events-on-month-view="short" editable-events resize-x :events="events" :on-event-click="onEventClick" :time-step="30" hide-weekends :time-from="8 * 60" :time-to="19 * 60"></vue-cal>
            <!--   -->
        </div>
    </div>

    <modal name="eventModal" width="80%" height="auto" :scrollable="true" @before-open="beforeOpen">

        <div class="card mb-3 text-center">
            <div class="card-header">
                <label style="padding:5px">
                    <!-- test -->
                    <b>
                        <i class="fas fa-filter"></i> <span>{{ selectedEvent.title }}</span>
                    </b>
                </label>
                <button @click="closeModal" class="btn btn-primary float-right">X</button>
            </div>
            <div class="card-body d-flex flex-column">
                start <strong>{{selectedEvent.startDate}}</strong>
                {{selectedEvent.content}}

            </div>
            <div class="card-footer float-right">

            </div>
        </div>

    </modal>

</div>
</template>

<script>
/* PRO COMPONENTS */

// CALENDAR : https://antoniandre.github.io/vue-cal/#ex--more-advanced-event-creation
import VueCal from "vue-cal";
import "vue-cal/dist/i18n/fr.js";
import "vue-cal/dist/vuecal.css";

// DATETIMEPICKER  https://www.npmjs.com/package/vue-datetime
import {
    Datetime
} from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css'
import {
    Settings
} from 'luxon'
Settings.defaultLocale = 'fr'

// https://momentjs.com/
import moment from 'moment';

export default {
    components: {
        VueCal,
        Datetime
    },

    data: () => ({
        selectedEvent: {},
        showDialog: false,
        events: [{
            start: "2020-01-01 09:00",
            end: "2020-01-01 12:00",
            title: "Need to go shopping",
            content: 'Click to see my shopping list',
            contentFull: 'My shopping list is rather long:<br><ul><li>Avocadoes</li><li>Tomatoes</li><li>Potatoes</li><li>Mangoes</li></ul>', // Custom attribute.
            class: 'leisure'
        }],
        newEvent: {
            class: 'leisure'
        }
    }),
    name: "Calendar",
    props: {
        msg: String
    },
    methods: {
        createEvent() {

            // Creating a copy to avoid some 2 ways bindings conflicts
            var myEvent = Object.assign({}, this.newEvent); 
            
            // Converting datetime picker date format to calendar date format
            myEvent.start = this.convertUtcDateToCalFormat(myEvent.start)
            myEvent.end   = this.convertUtcDateToCalFormat(myEvent.end)

           // Checking if dates are correct
           if (myEvent.start > myEvent.end) {
                //date is past
                  this.$notify({
                            type: 'error',
                            group: 'foo',
                            title: 'Hey! ',
                            text: 'La date de début est incorrecte'
                        });
                return;
            } else {
                //date is future
            }

            //Pushing into the calendar
            this.events.push(myEvent);

            this.$notify({
                type: 'success',
                group: 'foo',
                title: 'Hey! ',
                text: 'Date added '
            });

        },
        readEvent() {},
        updateEvent() {},
        deleteEvent() {},
        // Convert from Datetime with TIMEZONE format to YYYY-MM-DD HH:mm
        convertUtcDateToCalFormat(date) {
            let dt = moment(date).utcOffset(date)
            var defDate = dt.format('YYYY-MM-DD HH:mm')
            return defDate;
        },

        onEventClick(event, e) {
            this.$modal.show("eventModal", event);
            // Prevent navigating to narrower view (default vue-cal behavior).
            // e.stopPropagation()
        },
        beforeOpen(event) {
            console.log(event);
            this.selectedEvent = event.params;
        },
        closeModal: function () {
            this.$modal.hide("eventModal");
        }
    },
    created: function () {

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
/* Different color for different event types. */
.vuecal__event.leisure {
    background-color: rgba(253, 156, 66, 0.9);
    border: 1px solid rgb(233, 136, 46);
    color: #fff;
}

.vuecal__event.sport {
    background-color: rgba(255, 102, 102, 0.9);
    border: 1px solid rgb(235, 82, 82);
    color: #fff;
}

.vuecal__event {
    cursor: pointer;
}

.vuecal__event-title {
    font-size: 1.2em;
    font-weight: bold;
    margin: 4px 0 8px;
}

.vuecal__event-time {
    display: inline-block;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.vuecal__event-content {
    font-style: italic;
}
</style>
