<template>
  <div class="scheduler-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="10" class="text-center">
            <div class="hero-content">
              <h1 class="hero-title">Task Scheduler</h1>
              <p class="hero-subtitle">
                Schedule and automate recurring API operations
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-container fluid class="main-content">
      <v-container>
        <v-row>
          <v-col cols="12" md="9">
            <v-container>
              <!-- Overview -->
              <section id="overview" class="doc-section">
                <h2>Overview</h2>
                <p>
                  The Task Scheduler allows you to run API operations on a schedule - every few seconds, minutes, hours, or on specific
                  days and times. It's built into the <NuxtLink to="/python/client">AcumaticaClient</NuxtLink> and handles task execution,
                  monitoring, and persistence automatically.
                </p>
                <p class="note">
                  <strong>Important:</strong> The scheduler runs in a background thread. You must keep your main script running
                  (e.g., with a <code>while True</code> loop or as part of a web server) for scheduled tasks to execute.
                </p>
                <CodeSnippet :code="overviewExample" language="python" />
              </section>

              <!-- Basic Usage -->
              <section id="basic-usage" class="doc-section">
                <h2>Basic Usage</h2>
                <p>Access the scheduler via <code>client.scheduler</code>:</p>
                <CodeSnippet :code="basicUsageExample" language="python" />
              </section>

              <!-- Schedule Types -->
              <section id="schedule-types" class="doc-section">
                <h2>Schedule Types</h2>
                <p>Create schedules using the builder pattern:</p>

                <h3>Interval Schedules</h3>
                <CodeSnippet :code="intervalExample" language="python" />

                <h3>Daily Schedules</h3>
                <CodeSnippet :code="dailyExample" language="python" />

                <h3>Weekly Schedules</h3>
                <CodeSnippet :code="weeklyExample" language="python" />

                <h3>Cron-like Schedules</h3>
                <CodeSnippet :code="cronExample" language="python" />
              </section>

              <!-- Task Management -->
              <section id="task-management" class="doc-section">
                <h2>Task Management</h2>
                <p>Manage scheduled tasks:</p>
                <CodeSnippet :code="managementExample" language="python" />
              </section>

              <!-- Task Options -->
              <section id="task-options" class="doc-section">
                <h2>Task Options</h2>
                <p>Configure task behavior with <code>RetryPolicy</code> and callbacks:</p>
                <CodeSnippet :code="optionsExample" language="python" />
                <ul>
                  <li><code>retry_policy</code>: <code>RetryPolicy</code> object for automatic retry on failure</li>
                  <li><code>on_success</code>: Callback function executed after successful completion</li>
                  <li><code>on_failure</code>: Callback function executed after task failure</li>
                  <li><code>enabled</code>: Whether the task is enabled (default: True)</li>
                  <li><code>max_runs</code>: Maximum number of executions (default: unlimited)</li>
                  <li><code>priority</code>: Task priority for execution order (default: 0)</li>
                </ul>
              </section>

              <!-- Callbacks -->
              <section id="callbacks" class="doc-section">
                <h2>Callbacks and Error Handling</h2>
                <p>Handle task events with callbacks:</p>
                <CodeSnippet :code="callbacksExample" language="python" />
              </section>

              <!-- Scheduler Control -->
              <section id="scheduler-control" class="doc-section">
                <h2>Scheduler Control</h2>
                <p>Start, stop, and monitor the scheduler:</p>
                <CodeSnippet :code="controlExample" language="python" />
              </section>

              <!-- Persistence -->
              <section id="persistence" class="doc-section">
                <h2>Task Persistence</h2>
                <p>Persist tasks across restarts:</p>
                <CodeSnippet :code="persistenceExample" language="python" />
              </section>

              <!-- Complex Example -->
              <section id="complex-example" class="doc-section">
                <h2>Complex Example</h2>
                <p>A practical example combining multiple features:</p>
                <CodeSnippet :code="complexExample" language="python" />
              </section>

              <!-- Decorator Pattern -->
              <section id="decorator" class="doc-section">
                <h2>Decorator Pattern</h2>
                <p>Use decorators for cleaner task definitions:</p>
                <CodeSnippet :code="decoratorExample" language="python" />
              </section>

              <!-- Best Practices -->
              <section id="best-practices" class="doc-section">
                <h2>Best Practices</h2>
                <ul>
                  <li><strong>Keep the main script running:</strong> Use a <code>while True</code> loop or run as part of a web server/daemon</li>
                  <li>Keep task functions lightweight and fast</li>
                  <li>Use error callbacks to handle and log failures</li>
                  <li>Set appropriate timeouts to prevent hanging tasks</li>
                  <li>Be mindful of API rate limits when scheduling frequent tasks</li>
                  <li>Use <code>max_instances=1</code> to prevent overlapping executions</li>
                  <li>Enable persistence for long-running applications</li>
                  <li>Test schedules with <code>run_immediately=True</code> before deploying</li>
                  <li>The scheduler automatically stops when the client is closed</li>
                </ul>
              </section>
            </v-container>
          </v-col>

          <!-- Sticky Navigation -->
          <v-col cols="12" md="3" class="d-none d-md-block">
            <div class="sticky-container">
              <OnPageNav :items="navItems" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <PageFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageFooter from '~/components/PythonPageFooter.vue';
import CodeSnippet from '~/components/CodeSnippet.vue';
import OnPageNav from '~/components/OnPageNav.vue';

// Navigation items
const navItems = ref([
  { id: 'overview', title: 'Overview', icon: 'mdi-information' },
  { id: 'basic-usage', title: 'Basic Usage', icon: 'mdi-play' },
  { id: 'schedule-types', title: 'Schedule Types', icon: 'mdi-calendar-clock' },
  { id: 'task-management', title: 'Task Management', icon: 'mdi-playlist-edit' },
  { id: 'task-options', title: 'Task Options', icon: 'mdi-cog' },
  { id: 'callbacks', title: 'Callbacks', icon: 'mdi-webhook' },
  { id: 'scheduler-control', title: 'Scheduler Control', icon: 'mdi-pause-circle' },
  { id: 'persistence', title: 'Persistence', icon: 'mdi-content-save' },
  { id: 'complex-example', title: 'Complex Example', icon: 'mdi-code-braces' },
  { id: 'decorator', title: 'Decorator Pattern', icon: 'mdi-at' },
  { id: 'best-practices', title: 'Best Practices', icon: 'mdi-star' },
]);

const overviewExample = `from easy_acumatica import AcumaticaClient
from easy_acumatica.scheduler import IntervalSchedule
import time

client = AcumaticaClient()

# Define a task function
def sync_customers():
    customers = client.customers.get_list()
    print(f"Synced {len(customers)} customers")

# Schedule to run every hour
client.scheduler.add_task(
    name="customer_sync",
    callable_obj=sync_customers,
    schedule=IntervalSchedule(hours=1)
)

# Start the scheduler
client.scheduler.start()

# Keep the script running (scheduler runs in background thread)
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Stopping scheduler...")
    client.scheduler.stop()
    client.logout()`;

const basicUsageExample = `from easy_acumatica import AcumaticaClient
from easy_acumatica.scheduler import IntervalSchedule
import time

client = AcumaticaClient()

def my_task():
    print("Task executed!")

# Add task
task = client.scheduler.add_task(
    name="my_task",
    callable_obj=my_task,
    schedule=IntervalSchedule(seconds=30)
)

# Start scheduler
client.scheduler.start()

# Keep running - scheduler executes in background
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    client.scheduler.stop()`;

const intervalExample = `from easy_acumatica.scheduler import IntervalSchedule

# Every 30 seconds
IntervalSchedule(seconds=30)

# Every 5 minutes
IntervalSchedule(minutes=5)

# Every 2 hours
IntervalSchedule(hours=2)

# Every day
IntervalSchedule(days=1)

# Combined intervals
IntervalSchedule(hours=1, minutes=30)  # Every 1.5 hours`;

const dailyExample = `from easy_acumatica.scheduler import DailySchedule

# Every day at 9:00 AM
DailySchedule(time="09:00")

# Every day at 5:30 PM
DailySchedule(time="17:30:00")

# Note: For multiple times per day, create separate tasks`;

const weeklyExample = `from easy_acumatica.scheduler import WeeklySchedule

# Every Monday at 9:00 AM
WeeklySchedule(day_of_week=0, time="09:00")  # 0 = Monday

# Every Friday at 5:00 PM
WeeklySchedule(day_of_week=4, time="17:00")  # 4 = Friday

# Day of week: 0=Monday, 1=Tuesday, 2=Wednesday, 3=Thursday, 4=Friday, 5=Saturday, 6=Sunday`;

const cronExample = `from easy_acumatica.scheduler import CronSchedule

# Cron syntax: minute hour day month weekday
# Every weekday at 8:30 AM
CronSchedule("30 8 * * 1-5")

# First day of month at midnight
CronSchedule("0 0 1 * *")

# Every 15 minutes
CronSchedule("*/15 * * * *")`;

const managementExample = `# List all tasks
tasks = client.scheduler.list_tasks()
for task in tasks:
    print(f"{task.name}: {task.status}")

# Get specific task
task = client.scheduler.get_task_by_name("customer_sync")

# Pause a task
client.scheduler.pause_task(task.id)

# Resume a task
client.scheduler.resume_task(task.id)

# Remove a task
client.scheduler.remove_task(task.id)

# Get task by ID
task = client.scheduler.get_task(task_id)`;

const optionsExample = `from easy_acumatica.scheduler import IntervalSchedule, RetryPolicy

def my_task():
    # Task logic
    pass

# Create retry policy
retry_policy = RetryPolicy(
    max_retries=3,
    retry_delay=120,
    exponential_backoff=True,
    backoff_factor=2.0
)

client.scheduler.add_task(
    name="my_task",
    callable_obj=my_task,
    schedule=IntervalSchedule(minutes=5),
    retry_policy=retry_policy,
    enabled=True,
    max_runs=None,
    priority=0
)`;

const callbacksExample = `from easy_acumatica.scheduler import IntervalSchedule

def my_task():
    # Your task logic
    result = client.customers.get_list()
    return len(result)

def on_success(task_result):
    print(f"Task completed: {task_result.result} customers")

def on_failure(task_result):
    print(f"Task failed: {task_result.error}")

client.scheduler.add_task(
    name="customer_sync",
    callable_obj=my_task,
    schedule=IntervalSchedule(minutes=10),
    on_success=on_success,
    on_failure=on_failure
)`;

const controlExample = `# Start scheduler
client.scheduler.start()

# Check if running
is_running = client.scheduler._running

# Get statistics
print(f"Total executions: {client.scheduler.total_executions}")
print(f"Successful: {client.scheduler.successful_executions}")
print(f"Failed: {client.scheduler.failed_executions}")

# Stop scheduler (waits for running tasks)
client.scheduler.stop(wait=True, timeout=30)

# Force stop (don't wait)
client.scheduler.stop(wait=False)`;

const persistenceExample = `from pathlib import Path
from easy_acumatica.scheduler import IntervalSchedule

# Enable persistence
client = AcumaticaClient()
client.scheduler.persist_tasks = True
client.scheduler.persist_file = Path("my_tasks.json")

# Add tasks - they'll be saved automatically
client.scheduler.add_task(
    name="sync_task",
    callable_obj=sync_function,
    schedule=IntervalSchedule(hours=1)
)

# On next startup, tasks are automatically loaded
# (Note: callable functions must be importable)`;

const complexExample = `from easy_acumatica import AcumaticaClient
from easy_acumatica.odata import QueryOptions, F
from easy_acumatica.scheduler import IntervalSchedule, RetryPolicy
from datetime import datetime
import logging
import time

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

client = AcumaticaClient()

def process_pending_orders():
    """Process orders that need attention."""
    try:
        # Find pending orders
        options = QueryOptions(
            filter=(F.Status == "Pending") & (F.OrderDate < datetime.now()),
            top=50
        )
        orders = client.sales_orders.get_list(options=options)

        processed = 0
        for order in orders:
            try:
                # Process order (example: release it)
                if hasattr(client.sales_orders, 'invoke_action_release'):
                    client.sales_orders.invoke_action_release(order)
                    processed += 1
            except Exception as e:
                logger.error(f"Failed to process order {order['OrderNbr']}: {e}")

        return processed
    except Exception as e:
        logger.error(f"Order processing failed: {e}")
        raise

def on_order_success(result):
    logger.info(f"Successfully processed {result.result} orders")

def on_order_failure(result):
    logger.error(f"Order processing failed: {result.error}")

# Create retry policy
retry_policy = RetryPolicy(
    max_retries=2,
    retry_delay=60,
    exponential_backoff=True
)

# Schedule order processing every 15 minutes
client.scheduler.add_task(
    name="process_orders",
    callable_obj=process_pending_orders,
    schedule=IntervalSchedule(minutes=15),
    retry_policy=retry_policy,
    on_success=on_order_success,
    on_failure=on_order_failure
)

# Start scheduler
client.scheduler.start()
logger.info("Scheduler started - processing orders every 15 minutes")

# Keep application running
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    logger.info("Shutting down...")
    client.scheduler.stop()
    client.logout()`;

const decoratorExample = `from easy_acumatica import AcumaticaClient
from easy_acumatica.scheduler import every

client = AcumaticaClient()

# Using the 'every' decorator (automatically creates IntervalSchedule)
@every(hours=1, scheduler=client.scheduler)
def sync_customers():
    customers = client.customers.get_list()
    print(f"Synced {len(customers)} customers")
    return len(customers)

# Task is automatically added to scheduler
client.scheduler.start()`;

useSeoMeta({
  title: 'Task Scheduler | Easy-Acumatica Python',
  description: 'Schedule and automate recurring API operations with Easy-Acumatica task scheduler.',
});
</script>

<style scoped>
.scheduler-page {
  background: #f8f9fa;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #6a1b9a 0%, #ab47bc 100%);
  padding: 4rem 0 3rem;
  margin-bottom: 3rem;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

/* Main Content */
.main-content {
  background: #f8f9fa;
  min-height: 100vh;
}

.doc-section {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  scroll-margin-top: 80px;
}

.doc-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a237e;
  margin-bottom: 1rem;
}

.doc-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a237e;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.doc-section p {
  color: #444;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.doc-section code {
  background: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
  color: #d32f2f;
}

.doc-section ul {
  margin-left: 1.5rem;
  color: #444;
  line-height: 1.8;
}

.doc-section ul li {
  margin-bottom: 0.5rem;
}

.doc-section a {
  color: #5e35b1;
  text-decoration: none;
  font-weight: 500;
}

.doc-section a:hover {
  text-decoration: underline;
}

/* Sticky Nav */
.sticky-container {
  position: sticky;
  top: 100px;
}
</style>
