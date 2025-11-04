import { Provider } from "react-redux";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { store } from "./store/store";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import {
  fetchAllTransactions,
  fetchSummary,
} from "./features/transactions/transactionSlice";
import { ChartsSection } from "./components/ChartsSection";
import { TransactionFilters } from "./components/TransactionFilters";
import { TransactionTable } from "./components/TransactionTable";
import { SummaryCards } from "./components/SummaryCards";
import { Footer } from "./components/Footer";

function AppContent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSummary());
    dispatch(fetchAllTransactions({}));
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="container mx-auto flex-1 px-4 py-6">
        <SummaryCards />
        <ChartsSection />
        <TransactionFilters />
        <TransactionTable />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
