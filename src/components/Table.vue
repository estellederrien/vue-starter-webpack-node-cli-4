<template>
 <div>
 <label>Filter by Name:</label>
      <input class="form-control" v-model="filters.name.value"/>
<v-table :data="users"   :filters="filters" class="table">
    <thead slot="head">
        <v-th sortKey="name">Name</v-th>
        <th>Age</th>
        <th>Email</th>
        <th>Address</th>
    </thead>
    <tbody slot="body" slot-scope="{displayData}">
        <tr v-for="row in displayData" :key="row.id">
            <td>{{ row.name }}</td>
            <td>{{ row.age }}</td>
            <td>{{ row.email }}</td>
            <td>
                {{ row.address.street }},
                {{ row.address.city }}
                {{ row.address.state}}
            </td>
        </tr>
    </tbody>
</v-table>
  </div>
</template>

<script>
import SmartTable from 'vuejs-smart-table';

export default {

    data: () => ({
        users: [{
            'name': "fesfes",
            "age": 45,
            "email": "fge",
            "address": "fzqfqzf"
        },
        {
            'name': "rzrrr",
            "age": 24,
            "email": "fge",
            "address": "fzqfqzf"
        }
        
        ],
        filters: {
            name: { value: '', keys: ['name'] }
            }
    }),
    name: 'Table',
    props: {
     
    },
    methods: {

    }
}
</script>

<style>

</style>
