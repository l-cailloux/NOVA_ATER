/**
 * Configuration centrale du serveur NOVA ATER
 * Modifiez les valeurs ci-dessous pour mettre à jour le site instantanément.
 */
const CONFIG = {
    // Informations du serveur
    serverName: "NOVA ATER",
    serverAddress: "smpmod-VP4d.aternos.me",
    minecraftVersion: "1.21.1",
    loader: "Fabric",
    tagline: "Serveur Minecraft moddé sous Fabric 1.21.1 proposant une aventure immersive, des dimensions mystiques, des biomes spectaculaires et un confort de jeu sublimé.",

    // Discord officiel
    discordUrl: "https://discord.gg/SxjV5pT9YZ",

    // CurseForge Modpacks
    curseforgeClientUrl: "https://www.curseforge.com/minecraft/modpacks/nova-ater",
    curseforgeServerUrl: "https://www.curseforge.com/minecraft/modpacks/nova-ater-serv",

    // Liens de téléchargement direct intégrés au projet GitHub (sans passer par un tiers)
    clientDownloadUrl: "downloads/nova-ater-client.zip",
    serverDownloadUrl: "downloads/nova-ater-serveur.zip",

    // Système de boost de RAM avec Medal (Aternos)
    medalBoostUrl: "https://aternos.medal.tv/fr-fr?utm_campaign=mc_aternos&utm_content=promocarousel",

    // Image principale / bannière
    mainImage: "images/banner/nova-ater-logo.svg"
};

// Export pour compatibilité si utilisé en module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
