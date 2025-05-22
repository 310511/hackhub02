// src/types/index.ts
export interface ExperimentRun {
  id: string;
  name: string;
  status: string;
  accuracy: number;
  loss: number;
  duration: number;
  timestamp: Date;
  params: {
    learning_rate: number;
    batch_size: number;
    epochs: number;
  };
}

export interface ModelVersion {
  version: string;
  name: string;
  type: string;
  accuracy: number;
  params: string;
  lastUpdated: string;
}

export interface NodeStatus {
  id: string;
  name: string;
  status: string;
  location: {
    lat: number;
    lng: number;
  };
  throughput: number;
  lastPing: number;
}