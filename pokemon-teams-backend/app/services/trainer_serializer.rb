class TrainerSerializer

    def initialize(trainer_object)
        @trainer = trainer_object
    end

    def to_serialized__json
        @trainer.to_json(include: {
            pokemons: {only: [:id, :nickname, :species]}
        })
    end
end
