---
date: 2025-04-15 10:00:00
layout: post
title: Elastic Stack in Action
subtitle: 'Elasticsearch'
description: >-
image: ../images/elastic.jpg
optimized_image: ../images/elastic.jpg
category: tech
tags:
  - elasticsearch
  - kibana
  - elastic stack
author: mehmetenverakkoc
paginate: true
---

![Elastic Stack in Action](../images/elastic.jpg)

## **Definition and Brief History of Elastic Stack**

The **Elastic Stack**, formerly known as the **ELK Stack**, is an open-source suite of tools designed for searching, analyzing, and visualizing data in real time. It is widely used for log and event data analysis, system monitoring, and operational intelligence across various domains.

The stack consists of four main components:

*   **Elasticsearch**: A distributed, RESTful search and analytics engine designed for horizontal scalability, reliability, and real-time search capabilities. It acts as the heart of the Elastic Stack.
*   **Logstash**: A powerful data processing pipeline that collects, transforms, and sends data from various sources to Elasticsearch.
*   **Kibana**: A data visualization tool that enables users to explore and interact with data stored in Elasticsearch through interactive dashboards and reports.
*   **Beats**: Lightweight data shippers that send data from edge machines to Logstash or Elasticsearch, providing an efficient way to collect metrics, logs, and network data.

The Elastic Stack was originally developed by Elasticsearch BV, a company founded in 2012 by Shay Banon, the original creator of Elasticsearch. Initially, the stack consisted of just Elasticsearch, Logstash, and Kibana, hence the acronym ELK. Over time, the stack grew with the introduction of Beats, prompting the rebranding to Elastic Stack.

Today, Elastic Stack is a core part of the Elastic Platform, which powers solutions for enterprise search, observability, and security. Its widespread adoption is fueled by its scalability, flexibility, and strong community support.

# Beats

**Beats** are lightweight data shippers used to collect and send data to **Elasticsearch** (or Logstash) for further processing and analysis. They are part of the **Elastic Stack** and are designed to run on edge devices (like servers, VMs, or containers) to collect logs, metrics, or other data.

## Types of Beats

*   Filebeat — log files
*   Metricbeat — telemetry data
*   Packetbeat — network data
*   Winlogbeat — windows event logs
*   Auditbeat — audit data
*   Heartbeat — uptime monitoring
*   Functionbeat — serverless data
*   Journalbeat — journald logs

# Logstash

**Logstash** is a server-side data processing pipeline that ingests, transforms, and sends data to **Elasticsearch** (or other destinations). It is a core part of the **Elastic Stack** and is mainly used for log and event data processing.

**Key Features of Logstash**

*   **Ingest Data from Multiple Sources —** Supports logs, metrics, events, and more from various sources (files, databases, cloud services, etc.)
*   **Transform & Enrich Data —** Uses filters to modify, clean, and enrich data (e.g., parsing JSON, removing unnecessary fields)
*   **Send Data to Multiple Outputs —** Common destinations include Elasticsearch, Kafka, Redis, databases, or other storage systems

## How does Logstash work?

## **1\. Input**

This is where Logstash **ingests data**. It supports a wide range of inputs such as:

*   Logs (from files, syslog, Beats, etc.)
*   Metrics
*   Events from message queues (Kafka, Redis, RabbitMQ)
*   Cloud services (AWS, Azure, GCP)
*   Databases

Each input source is defined by an **input plugin**.

## 2\. Filter

Once the data is ingested, it goes through a series of **filters** that **parse**, **transform**, or **enrich** it.

Common filter plugins include:

*   `grok`: for pattern matching (e.g. parsing unstructured logs)
*   `mutate`: to rename, replace, or remove fields
*   `date`: to convert timestamps into standard formats
*   `geoip`: to enrich IP addresses with geographical info

## 3\. Output

Finally, the processed data is **sent to a destination**, most commonly Elasticsearch, but it can also be sent to:

*   Files
*   Databases
*   Message queues
*   Other systems (stdout, email, etc.)

# Elasticsearch

**Elasticsearch** is a distributed search and analytics engine designed for fast, scalable data retrieval. It is widely used for full-text search, log analytics, real-time monitoring, and big data processing.

**Key Features of Elasticsearch**

*   **Full-Text Search** — Uses an advanced indexing system (based on Apache Lucene) for fast and accurate searches
*   **Distributed & Scalable** — Handles large-scale data across multiple nodes for high availability
*   **Real-Time Data Processing** — Provides near-instant search and analytics on streaming data
*   **JSON-Based REST API** — Easy to interact with via HTTP methods like GET, POST, and PUT
*   **Structured & Unstructured Data Support** — Stores logs, metrics, documents, and more
*   **Aggregation & Analytics** — Supports complex queries, dashboards, and statistical analysis

## How does Elasticsearch work?

## 1\. Documents & Indexes

*   A **document** is a basic unit of data in Elasticsearch, stored in **JSON** format.
*   Multiple documents are grouped into an **index**, which is similar to a table in relational databases.

## 2\. Inverted Index

*   Elasticsearch uses an **inverted index** data structure — ideal for full-text search. Instead of mapping documents to words, it maps **words to the documents** they appear in. This makes search operations lightning-fast.

## 3\. Shards & Replicas

To scale horizontally and ensure high availability:

*   An **index** is split into multiple **shards**.
*   Each shard can have **replicas** (copies) distributed across nodes.
*   This allows parallel processing and fault tolerance.

## 4\. Clusters & Nodes

*   A **cluster** is a collection of one or more **nodes** (servers) that together store and index data.
*   One node is elected as the **master node**, managing cluster-wide changes like adding/removing nodes or indices.

**Node Types**

🔹**_1\. Master Node_**

Responsible for **cluster-wide operations** like:

*   Creating or deleting indices
*   Tracking which nodes are part of the cluster
*   Managing shard allocation

`node.master: true`
`node.data: false`
`node.ingest: false`

🔹**_2\. Data Node_**

Stores **actual data** and performs **data-related operations** such as:

*   CRUD operations on documents
*   Search queries
*   Aggregations

`node.data: true`

🔹**_3\. Ingest Node_**

Used to **preprocess documents** before they are indexed. This includes:

*   Enriching fields
*   Parsing logs
*   Normalizing data

`node.ingest: true`

🔹 **_4_**. **_Coordinating Node (Client Node)_**

This is any node that:

*   Receives client requests
*   Distributes search and indexing operations to the appropriate nodes
*   Gathers and aggregates results

`node.master: false`
`node.data: false`
`node.ingest: false`

🔹**_5\. Machine Learning Node (X-Pack)_**

If you're using **Elastic's commercial features**, ML nodes handle anomaly detection jobs, model training, and forecasting.

`node.ml: true`

**Data Tier Node Types**

Starting with version **7.10**, Elasticsearch introduced a **data tiering model** to simplify the architecture and manage data based on its age, access frequency, and importance. Instead of managing all data on uniform nodes, now you can assign it to specific **tiered nodes** optimized for different workloads.

🔥 **_1\. Hot Tier Node_**

*   Purpose: Stores the most recent and frequently accessed data.
*   Optimized for: High ingestion rates, fast read/write.
*   Usage: Current logs, metrics, real-time analytics.

`node.roles: [ data_hot ]`

🌤️ **_2\. Warm Tier Node_**

*   Purpose: Holds data that is not written to anymore but is still queried occasionally.
*   Optimized for: Cheaper storage, moderate query performance.
*   Usage: Last week's logs, partially archived business data.

`node.roles: [ data_warm ]`

❄️ **_3\. Cold Tier Node_**

*   Purpose: Keeps rarely queried data, mainly for compliance or occasional inspection.
*   Optimized for: Low-cost storage, slower performance, infrequent access.
*   Usage: Old logs, historical metrics.

`node.roles: [ data_cold ]`

🧊 **_4\. Frozen Tier_**

*   Purpose: Hosts searchable snapshots — read-only indices stored in remote object storage (like S3).
*   Optimized for: Archive-level costs, ultra-rare queries.
*   Usage: Long-term audit logs, regulatory archives.

`node.roles: [ data_frozen ]`

# Kibana

Kibana is a visualization and analytics tool for Elasticsearch. It provides real-time dashboards, search capabilities, and data exploration features.

**Key Features of Kibana**

*   **Data Visualization** — Create graphs, charts, maps, and tables from Elasticsearch data
*   **Real-Time Dashboards** — Monitor log data, metrics, and security events interactively
*   **Search & Query Interface** — Use **KQL (Kibana Query Language)** or **Lucene** to filter and analyze data
*   **Security & Monitoring** — Supports SIEM (Security Information and Event Management) for threat detection
*   **Machine Learning Integration** — Detects anomalies and patterns in data
*   **Alerting & Reporting** — Set up alerts and generate reports based on data trends

## 💰**Premium Features of Elasticsearch: Watcher & CCR**

Elastic Stack offers a wide range of features, but some advanced capabilities are reserved for **premium (commercial) tiers**, such as **Gold**, **Platinum**, and **Enterprise** subscriptions. Two of the most powerful among them are:

**⏰ 1\. Watcher — Alerting and Notification Engine**

**Watcher** is Elastic's built-in alerting and monitoring system, allowing users to define rules that continuously watch the data in Elasticsearch and take automated actions when certain conditions are met.

1.  **Trigger** — Defines when the watch runs (e.g., every 5 minutes).
2.  **Condition** — Evaluates if an alert should be triggered (e.g., error count > 100).
3.  **Action** — Specifies what happens next (e.g., send an email, Slack message, or push data to Opsgenie).

_Sample Watcher JSON:_

```json
PUT _watcher/watch/error_alert  
{  
  "trigger": {  
    "schedule": { "interval": "1m" }  
  },  
  "input": {  
    "search": {  
      "request": {  
        "indices": ["logs-*"],  
        "body": {  
          "query": {  
            "match": { "level": "error" }  
          }  
        }  
      }  
    }  
  },  
  "condition": {  
    "compare": { "ctx.payload.hits.total.value": { "gt": 10 } }  
  },  
  "actions": {  
    "email_admin": {  
      "email": {  
        "to": "admin@example.com",  
        "subject": "High Error Rate Detected",  
        "body": "More than 10 errors occurred in the last minute."  
      }
    }  
  }  
}
```

**🌐 2\. CCR — Cross Cluster Replication**

**Cross-Cluster Replication (CCR)** is a feature in Elasticsearch that allows data replication from one cluster (leader) to another cluster (follower) in real-time. It is commonly used for disaster recovery, geographic redundancy, and data locality optimization.

**How It Works:**

*   One index (the leader) resides in the source cluster.
*   A follower index on a remote cluster continuously replicates the data.
*   Replication is asynchronous but nearly real-time.

In conclusion, as organizations increasingly rely on real-time data for insights and operational efficiency, the Elastic Stack continues to stand out as a versatile and powerful platform. Whether you're collecting logs, monitoring systems, or building a search-powered application, Elastic's modular architecture and advanced features — including data tiering, alerting, and cross-cluster replication — make it a compelling choice for modern data engineering. With the right understanding and design, the Elastic Stack is not just a toolset, but a strategic asset.

**References**

Elastic - The Search AI Company: [https://www.elastic.co](https://www.elastic.co) 