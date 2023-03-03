import * as command from "../functions/commands";
import * as hears from "../functions/hears";

(async () => {
    await command.start();
    await hears.text();
    await command.launch();
})();
