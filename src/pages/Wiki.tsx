import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Book, ChevronRight, Code, Download, ExternalLink, FileText, Folder, FolderOpen, GitBranch, Search, Star } from "lucide-react";

interface WikiSection {
  id: string;
  title: string;
  content?: React.ReactNode;
  children?: WikiSection[];
}

const Wiki = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["getting-started", "api", "examples"]));

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const wikiSections: WikiSection[] = [
    {
      id: "overview",
      title: "Overview",
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-white">pyEXG-ML Documentation</h1>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/BIOCOM-TECH-US/pyEXG-ML" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors"
              >
                <ExternalLink size={18} />
                View on GitHub
              </a>
              <button className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-black rounded-lg transition-colors">
                <Star size={18} />
                Star
              </button>
            </div>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Real-time BCI Streaming and ML Utilities</h3>
            <p className="text-gray-300">
              pyEXG-ML provides tools for real-time Brain-Computer Interface (BCI) streaming and machine learning utilities 
              built on top of BrainFlow. This library enables efficient collection, processing, and analysis of EEG data 
              with Elasticsearch integration for scalable data storage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <Download className="text-green-400" size={20} />
                Quick Install
              </h3>
              <div className="bg-black rounded-lg p-4 overflow-x-auto">
                <code className="text-green-400 text-sm">
                  git clone https://github.com/BIOCOM-TECH-US/pyEXG-ML.git<br/>
                  cd pyEXG-ML<br/>
                  python -m venv env<br/>
                  source env/bin/activate<br/>
                  pip install -r requirements.txt<br/>
                  pip install -e .
                </code>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <Code className="text-blue-400" size={20} />
                Key Features
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  Real-time EEG data streaming
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  Elasticsearch integration with TSDS
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  BrainFlow board support
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  ML utilities and signal processing
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "getting-started",
      title: "Getting Started",
      children: [
        {
          id: "installation",
          title: "Installation",
          content: (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Installation</h2>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Prerequisites</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Python 3.8 or higher</li>
                  <li>Git</li>
                  <li>Virtual environment (recommended)</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Step-by-step Installation</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">1. Clone the Repository</h4>
                    <div className="bg-black rounded-lg p-4 overflow-x-auto">
                      <code className="text-green-400">
                        git clone https://github.com/BIOCOM-TECH-US/pyEXG-ML.git<br/>
                        cd pyEXG-ML
                      </code>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">2. Create Virtual Environment</h4>
                    <div className="bg-black rounded-lg p-4 overflow-x-auto">
                      <code className="text-green-400">
                        python -m venv env
                      </code>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">3. Activate Virtual Environment</h4>
                    <div className="bg-black rounded-lg p-4 overflow-x-auto">
                      <code className="text-green-400">
                        # On Linux/macOS<br/>
                        source env/bin/activate<br/><br/>
                        # On Windows<br/>
                        env\Scripts\activate
                      </code>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">4. Install Dependencies</h4>
                    <div className="bg-black rounded-lg p-4 overflow-x-auto">
                      <code className="text-green-400">
                        python -m pip install --upgrade pip<br/>
                        pip install -r requirements.txt<br/>
                        pip install -e .
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-200">
                  <strong>Note:</strong> Make sure to activate your virtual environment before installing dependencies to avoid conflicts with system packages.
                </p>
              </div>
            </div>
          )
        },
        {
          id: "quick-start",
          title: "Quick Start",
          content: (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Quick Start Guide</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Basic EEG Data Collection</h3>
                  <div className="bg-black rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
{`import pybrainml as bml

# Create experiment
exp = bml.create_experiment()
exp.user_setup("Subject1", 25, "M")
exp.hardware_setup(bml.ElectrodeType.DRY, bml.Boards.OpenBCI_Ganglion)

# Connect to board
board = bml.connect_board("/dev/ttyUSB0", bml.Boards.OpenBCI_Ganglion)

# Start data collection
with bml.board_session(board):
    bml.exg_stream(board, length=200, duration=10.0)`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Elasticsearch Integration</h3>
                  <div className="bg-black rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
{`# Create Elasticsearch client
es_client = bml.create_elasticsearch_client(
    host="localhost",
    port=9200,
    username="your_username",
    password="your_password"
)

# Setup indices
es_client.setup_indices()
es_client.setup_tsds(["Ch1", "Ch2", "Ch3", "Ch4"])

# Upload experiment data
result = bml.upload_experiment_to_elasticsearch(
    experiment_dict,
    es_client,
    channel_names
)`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: "api",
      title: "API Reference",
      children: [
        {
          id: "boards",
          title: "Boards & Hardware",
          content: (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Boards & Hardware</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Supported Boards</h3>
                  <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="text-left p-4 text-white">Board</th>
                          <th className="text-left p-4 text-white">Channels</th>
                          <th className="text-left p-4 text-white">Sampling Rate</th>
                          <th className="text-left p-4 text-white">Type</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr className="border-t border-gray-700">
                          <td className="p-4 font-mono">OpenBCI_Ganglion</td>
                          <td className="p-4">4</td>
                          <td className="p-4">200 Hz</td>
                          <td className="p-4">Wireless EEG</td>
                        </tr>
                        <tr className="border-t border-gray-700">
                          <td className="p-4 font-mono">OpenBCI_Cyton</td>
                          <td className="p-4">8</td>
                          <td className="p-4">250 Hz</td>
                          <td className="p-4">Wireless EEG</td>
                        </tr>
                        <tr className="border-t border-gray-700">
                          <td className="p-4 font-mono">OpenBCI_CytonDaisy</td>
                          <td className="p-4">16</td>
                          <td className="p-4">250 Hz</td>
                          <td className="p-4">Wireless EEG</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Board Class Methods</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-mono text-blue-300 mb-2">connect_board(port, board_id, max_retries=3)</h4>
                      <p className="text-gray-300 mb-3">Connect to a BrainFlow board with automatic retry logic.</p>
                      <div className="bg-black rounded-lg p-3">
                        <code className="text-green-400 text-sm">
                          board = bml.connect_board("/dev/ttyUSB0", bml.Boards.OpenBCI_Ganglion)
                        </code>
                      </div>
                    </div>

                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-mono text-blue-300 mb-2">board_session(board_fd)</h4>
                      <p className="text-gray-300 mb-3">Context manager for board session handling with automatic cleanup.</p>
                      <div className="bg-black rounded-lg p-3">
                        <code className="text-green-400 text-sm">
                          with bml.board_session(board):<br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;# Your data collection code here
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: "elasticsearch",
          title: "Elasticsearch Client",
          content: (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Elasticsearch Client</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">ElasticsearchClient Class</h3>
                  <p className="text-gray-300 mb-4">
                    The ElasticsearchClient provides a comprehensive interface for storing and querying EEG data 
                    using Elasticsearch with Time Series Data Stream (TSDS) architecture.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Core Methods</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-mono text-blue-300 mb-2">setup_indices()</h4>
                      <p className="text-gray-300">Create experiments and frames indices with proper mappings.</p>
                    </div>

                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-mono text-blue-300 mb-2">setup_tsds(channel_names)</h4>
                      <p className="text-gray-300 mb-3">Setup Time Series Data Stream for real-time streaming.</p>
                      <div className="bg-black rounded-lg p-3">
                        <code className="text-green-400 text-sm">
                          es_client.setup_tsds(["Fp1", "Fp2", "C3", "C4"])
                        </code>
                      </div>
                    </div>

                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-mono text-blue-300 mb-2">upload_experiment_metadata(experiment_dict)</h4>
                      <p className="text-gray-300 mb-3">Upload experiment metadata and return experiment_id.</p>
                      <div className="bg-black rounded-lg p-3">
                        <code className="text-green-400 text-sm">
                          experiment_id = es_client.upload_experiment_metadata(exp_dict)
                        </code>
                      </div>
                    </div>

                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-mono text-blue-300 mb-2">upload_frames_bulk(experiment_id, frames, channel_names)</h4>
                      <p className="text-gray-300 mb-3">Bulk upload frames to the frames index.</p>
                      <div className="bg-black rounded-lg p-3">
                        <code className="text-green-400 text-sm">
                          frame_ids = es_client.upload_frames_bulk(exp_id, frames, channels)
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Query Methods</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-mono text-blue-300 mb-2">get_experiment_metadata(experiment_id)</h4>
                      <p className="text-gray-300">Retrieve experiment metadata by ID.</p>
                    </div>

                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-mono text-blue-300 mb-2">get_experiment_frames(experiment_id, start_time, end_time)</h4>
                      <p className="text-gray-300">Query frames with optional time filtering.</p>
                    </div>

                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-mono text-blue-300 mb-2">search_tsds_frames(experiment_id, start_time, end_time)</h4>
                      <p className="text-gray-300">Query TSDS for real-time data with time filtering.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: "examples",
      title: "Examples",
      children: [
        {
          id: "basic-usage",
          title: "Basic Usage",
          content: (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Basic Usage Examples</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Complete EEG Data Collection</h3>
                  <div className="bg-black rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
{`import pybrainml as bml

# Create and configure experiment
exp = bml.create_experiment()
exp.user_setup("TestSubject", 25, "M")
exp.hardware_setup(bml.ElectrodeType.DRY, bml.Boards.OpenBCI_Ganglion)

# Connect to board
board = bml.connect_board("/dev/ttyUSB0", bml.Boards.OpenBCI_Ganglion)

# Collect data for 30 seconds
with bml.board_session(board):
    bml.exg_stream(
        board_fd=board,
        length=200,        # Buffer size
        duration=30.0,     # Duration in seconds
        save_fd="data"     # Save directory
    )

# Export experiment data
bml.export_experiment(session, exp, data_dir="experiments")`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Real-time Streaming to Elasticsearch</h3>
                  <div className="bg-black rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
{`import pybrainml as bml
from datetime import datetime

# Setup Elasticsearch client
es_client = bml.create_elasticsearch_client(
    host="localhost",
    port=9200,
    username="elastic",
    password="password"
)

# Setup indices and TSDS
es_client.setup_indices()
channel_names = ["Fp1", "Fp2", "C3", "C4"]
es_client.setup_tsds(channel_names)

# Create experiment
exp = bml.create_experiment()
exp.user_setup("LiveSubject", 30, "F")
exp.hardware_setup(bml.ElectrodeType.WET, bml.Boards.OpenBCI_Cyton)

# Upload experiment metadata
experiment_id = es_client.upload_experiment_metadata(exp.to_dict())

# Create real-time streamer
streamer = bml.create_realtime_streamer(
    es_client,
    exp.to_dict(),
    channel_names
)

# Start streaming
streamer.start_streaming()

# Simulate adding frames (replace with actual board data)
for i in range(100):
    frame = {
        "timestamp": datetime.now().isoformat(),
        "label": "live_data",
        "eeg_data": [[1.0, 2.0, 3.0, 4.0]]  # Replace with real EEG data
    }
    streamer.add_frame(frame)

# Stop streaming
streamer.stop_streaming()`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: "advanced-examples",
          title: "Advanced Examples",
          content: (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Advanced Examples</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Custom Signal Processing</h3>
                  <div className="bg-black rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
{`import pybrainml as bml
import numpy as np

# Load experiment data
exp = bml.load_experiment_from_json("data/session.json")

# Extract EEG data
eeg_data = []
for frame in exp.frames:
    if frame.eeg_data:
        eeg_data.extend(frame.eeg_data)

# Convert to numpy array for processing
eeg_array = np.array(eeg_data)

# Apply FFT analysis
fft_data = bml.compute_fft(eeg_data)
power_spectrum = bml.compute_power_spectrum(eeg_data)

# Custom filtering (example)
def apply_bandpass_filter(data, low_freq=8, high_freq=30, sampling_rate=250):
    """Apply bandpass filter for alpha/beta frequencies"""
    from scipy.signal import butter, filtfilt
    
    nyquist = sampling_rate / 2
    low = low_freq / nyquist
    high = high_freq / nyquist
    
    b, a = butter(4, [low, high], btype='band')
    filtered_data = filtfilt(b, a, data, axis=0)
    
    return filtered_data

# Apply custom filtering
filtered_eeg = apply_bandpass_filter(eeg_array)

print(f"Original shape: {eeg_array.shape}")
print(f"Filtered shape: {filtered_eeg.shape}")`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Multi-Subject Experiment Management</h3>
                  <div className="bg-black rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
{`import pybrainml as bml
from datetime import datetime, timedelta

# Setup Elasticsearch client
es_client = bml.create_elasticsearch_client("localhost", 9200)
es_client.setup_indices()

subjects = [
    {"name": "Subject001", "age": 25, "sex": "M"},
    {"name": "Subject002", "age": 30, "sex": "F"},
    {"name": "Subject003", "age": 28, "sex": "M"}
]

channel_names = ["Fp1", "Fp2", "C3", "C4", "P3", "P4", "O1", "O2"]
es_client.setup_tsds(channel_names)

experiment_ids = []

for subject in subjects:
    # Create experiment for each subject
    exp = bml.create_experiment()
    exp.user_setup(subject["name"], subject["age"], subject["sex"])
    exp.hardware_setup(bml.ElectrodeType.WET, bml.Boards.OpenBCI_CytonDaisy)
    
    # Add experiment description
    exp.metadata.description = f"Multi-subject study - {subject['name']}"
    
    # Upload to Elasticsearch
    result = bml.upload_experiment_to_elasticsearch(
        exp.to_dict(),
        es_client,
        channel_names
    )
    
    experiment_ids.append(result["experiment_id"])
    print(f"Created experiment for {subject['name']}: {result['experiment_id']}")

# Query all experiments
print(f"\\nCreated {len(experiment_ids)} experiments")
for exp_id in experiment_ids:
    metadata = es_client.get_experiment_metadata(exp_id)
    subject_id = metadata["subject_info"]["subject_id"]
    print(f"Experiment {exp_id}: Subject {subject_id[:8]}...")`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Troubleshooting</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Common Issues</h3>
              
              <div className="space-y-4">
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-300 mb-2">Board Connection Issues</h4>
                  <p className="text-gray-300 mb-2"><strong>Problem:</strong> Cannot connect to OpenBCI board</p>
                  <p className="text-gray-300 mb-2"><strong>Solutions:</strong></p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                    <li>Check USB/serial port permissions</li>
                    <li>Verify correct port path (e.g., /dev/ttyUSB0 on Linux)</li>
                    <li>Ensure board is powered on and in range</li>
                    <li>Try different USB ports or cables</li>
                  </ul>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-300 mb-2">Elasticsearch Connection</h4>
                  <p className="text-gray-300 mb-2"><strong>Problem:</strong> Cannot connect to Elasticsearch</p>
                  <p className="text-gray-300 mb-2"><strong>Solutions:</strong></p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                    <li>Verify Elasticsearch is running</li>
                    <li>Check host and port configuration</li>
                    <li>Validate authentication credentials</li>
                    <li>Ensure network connectivity</li>
                  </ul>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-2">Data Quality Issues</h4>
                  <p className="text-gray-300 mb-2"><strong>Problem:</strong> Poor signal quality or artifacts</p>
                  <p className="text-gray-300 mb-2"><strong>Solutions:</strong></p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                    <li>Check electrode placement and skin contact</li>
                    <li>Ensure proper grounding</li>
                    <li>Minimize electrical interference</li>
                    <li>Apply appropriate filtering</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Performance Optimization</h3>
              
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></div>
                    <div>
                      <strong>Batch Size:</strong> Use bulk uploads for historical data to improve performance
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></div>
                    <div>
                      <strong>Channel Names:</strong> Use meaningful channel names (e.g., "Fp1" vs "Ch1")
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></div>
                    <div>
                      <strong>Time Filtering:</strong> Always use time ranges for large dataset queries
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></div>
                    <div>
                      <strong>Buffer Size:</strong> Adjust streaming buffer size based on data rate
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const renderSidebar = () => {
    const renderSection = (section: WikiSection, level = 0) => (
      <div key={section.id} className={`${level > 0 ? 'ml-4' : ''}`}>
        <button
          onClick={() => {
            if (section.children) {
              toggleSection(section.id);
            } else {
              setActiveSection(section.id);
            }
          }}
          className={`w-full text-left p-2 rounded-lg transition-colors flex items-center gap-2 ${
            activeSection === section.id
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          {section.children ? (
            expandedSections.has(section.id) ? (
              <FolderOpen size={16} className="text-blue-400" />
            ) : (
              <Folder size={16} className="text-gray-400" />
            )
          ) : (
            <FileText size={16} className="text-gray-400" />
          )}
          <span className="font-medium">{section.title}</span>
          {section.children && (
            <ChevronRight 
              size={16} 
              className={`ml-auto transition-transform ${
                expandedSections.has(section.id) ? 'rotate-90' : ''
              }`}
            />
          )}
        </button>
        {section.children && expandedSections.has(section.id) && (
          <div className="mt-1 space-y-1">
            {section.children.map(child => renderSection(child, level + 1))}
          </div>
        )}
      </div>
    );

    return (
      <div className="space-y-1">
        {wikiSections.map(section => renderSection(section))}
      </div>
    );
  };

  const findSectionById = (sections: WikiSection[], id: string): WikiSection | null => {
    for (const section of sections) {
      if (section.id === id) return section;
      if (section.children) {
        const found = findSectionById(section.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const activeContent = findSectionById(wikiSections, activeSection);

  const filteredSections = wikiSections.filter(section => 
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (section.children && section.children.some(child =>
      child.title.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-80 flex-shrink-0 bg-gray-900 border border-gray-700 rounded-lg p-6 h-fit sticky top-24">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Book className="text-blue-400" size={24} />
                  <h2 className="text-xl font-bold">pyEXG-ML Wiki</h2>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <nav className="space-y-1">
                {searchQuery ? (
                  filteredSections.length > 0 ? (
                    filteredSections.map(section => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left p-2 rounded-lg transition-colors ${
                          activeSection === section.id
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
                      >
                        {section.title}
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm p-2">No results found</p>
                  )
                ) : (
                  renderSidebar()
                )}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
                {activeContent ? activeContent.content : (
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-400 mb-4">Section not found</h2>
                    <p className="text-gray-500">Please select a section from the sidebar.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Wiki;
