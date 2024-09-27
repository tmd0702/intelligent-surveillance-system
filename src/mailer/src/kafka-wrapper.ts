import {KafkaWrapper} from "@softzone/common";
import {randomUUID} from "crypto";
export const kafkaWrapper = new KafkaWrapper(['localhost:9092'], randomUUID());