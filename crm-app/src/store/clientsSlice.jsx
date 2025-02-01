import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8080/api/clients";

// Pobieranie klientów z backendu
export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async () => {
    const response = await axios.get(API_URL);
    console.log("Dane z backendu:", response.data);
    return response.data;
  }
);

// Dodawanie klienta
export const addClient = createAsyncThunk(
  "clients/addClient",
  async (client) => {
    const response = await axios.post(API_URL, client);
    return response.data;
  }
);

// Aktualizacja klienta (edycja)
export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async (client) => {
    const response = await axios.put(`${API_URL}/${client.id}`, client);
    return response.data;
  }
);

// Usuwanie klienta
export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.clients.push(action.payload);
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        const index = state.clients.findIndex(
          (client) => client.id === action.payload.id
        );
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter(
          (client) => client.id !== action.payload
        );
      });
  },
});

export default clientsSlice.reducer;
