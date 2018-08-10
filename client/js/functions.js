var functions = [];

functions[0] = {};
functions[0].name = "say";
functions[0].url = "/command/say";
functions[0].arguments = ["string"];
functions[0].argumentNames = ["speechText"];

functions[1] = {};
functions[1].name = "goToPosition";
functions[1].url = "/command/go_to_position";
functions[1].arguments = ["number", "number", "number"];
functions[1].argumentNames = ["x", "y", "z"];

