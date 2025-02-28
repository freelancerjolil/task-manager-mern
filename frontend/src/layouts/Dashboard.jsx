import { Chart, registerables } from 'chart.js';
import { motion } from 'framer-motion';
import { Bar, Pie } from 'react-chartjs-2';
import {
  FaCheckCircle,
  FaClipboardList,
  FaList,
  FaSpinner,
  FaTasks,
} from 'react-icons/fa';

// Register Chart.js components
Chart.register(...registerables);

function Dashboard() {
  const totalTasks = 150;
  const completedTasks = 90;
  const inProgressTasks = 30;
  const toDoTasks = 20;
  const pendingTasks = 10;
  const completedPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="p-6 py-16 bg-orange-100 dark:bg-slate-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Dashboard Overview
      </h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Tasks"
          count={totalTasks}
          icon={<FaTasks className="text-blue-500" />}
        />
        <StatCard
          title="Completed"
          count={completedTasks}
          icon={<FaCheckCircle className="  text-green-500" />}
        />
        <StatCard
          title="In Progress"
          count={inProgressTasks}
          icon={<FaSpinner className=" text-yellow-500" />}
        />
        <StatCard
          title="To-Do"
          count={toDoTasks}
          icon={<FaClipboardList className="  text-purple-500" />}
        />
        <StatCard
          title="Pending"
          count={pendingTasks}
          icon={<FaList className="  text-red-500" />}
        />
      </div>

      {/* Progress Bar Section */}
      <div className="mt-8 p-6 bg-white dark:bg-slate-600 shadow-lg rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Task Completion Progress</h3>
        <motion.div
          className="bg-gray-200 h-6 rounded-lg overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `${completedPercentage}%` }}
          transition={{ duration: 1 }}
        >
          <div className="h-full bg-blue-500 text-white text-sm flex items-center justify-center">
            {completedPercentage.toFixed(0)}% Completed
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Bar Chart */}
        <div className="bg-white p-6 dark:bg-slate-600 dark:text-white/90 rounded-xl shadow-lg h-[400px]">
          <h3 className="text-lg font-semibold mb-4">Task Progress Overview</h3>
          <Bar
            data={{
              labels: ['Completed', 'In Progress', 'To-Do', 'Pending'],
              datasets: [
                {
                  label: 'Tasks',
                  data: [
                    completedTasks,
                    inProgressTasks,
                    toDoTasks,
                    pendingTasks,
                  ],
                  backgroundColor: ['#4CAF50', '#FFC107', '#673AB7', '#F44336'],
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    color: 'white', // Ensures legend text is white in dark mode
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: 'white', // Ensures x-axis labels are white
                  },
                },
                y: {
                  ticks: {
                    color: 'white', // Ensures y-axis labels are white
                  },
                },
              },
            }}
          />
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 dark:bg-slate-600 dark:text-white/90 rounded-xl shadow-lg h-[400px]">
          <h3 className="text-lg font-semibold mb-4">Task Distribution</h3>
          <Pie
            data={{
              labels: ['Completed', 'In Progress', 'To-Do', 'Pending'],
              datasets: [
                {
                  label: 'Task Distribution',
                  data: [
                    completedTasks,
                    inProgressTasks,
                    toDoTasks,
                    pendingTasks,
                  ],
                  backgroundColor: ['#4CAF50', '#FFC107', '#673AB7', '#F44336'],
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    color: 'white', // Ensures legend text is white in dark mode
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Reusable Card Component
function StatCard({ title, count, icon }) {
  return (
    <motion.div
      className="p-6 bg-white shadow-lg rounded-xl flex items-center gap-4"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-3xl">{icon}</div>
      <div>
        <h4 className="text-xl font-semibold">{title}</h4>
        <p className="text-gray-600 text-lg">{count}</p>
      </div>
    </motion.div>
  );
}

export default Dashboard;
